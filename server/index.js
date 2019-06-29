// const path = require('path'); // Usually moved to the start of file

require('dotenv').config()
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socket = require('socket.io');
const {SERVER_PORT,SESSION_SECRET,CONNECTION_STRING} = process.env;
const ctrl = require('./controller');

const app = express();
app.use(express.json());
app.use( express.static( `${__dirname}/../build` ) );


const io = socket(app.listen(SERVER_PORT,()=>{
    console.log('Server is running on port '+ SERVER_PORT)
}))

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
    
})

io.on('connection',function(socket){

    socket.on('startChat',async function(room){
        const db = app.get('db');
        let messages = await db.get_room(room)
        if(messages[0]){
            socket.join(room.room);
            io.in(room.room).emit('startChat',messages)
        } else {
            await db.create_room(room)
            socket.join(room)
            io.in(room).emit('startChat',messages)
        }
    })
    
    socket.on('sendMsg', async function(data){
        const db = app.get('db');
        const {message,id,room} = data;
        const messages = await db.create_message({message,id,room})
        io.in(room).emit('sendMsg',messages)
    })

    socket.on('endChat',function(room){
        socket.leave(room)
    })
})
app.use(session({
    secret:SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:600000
    }
}))

// app.use(function(req,res,next){
//     console.log('Hey I am application level middleware')
//     next()
// })


//ENDPOINTS
// app.get('/api/users/:id',ctrl.getUsers);
app.post('/api/chat/group/create',ctrl.createGroup);
app.get('/api/chats/group/getAll/:user_id',ctrl.getGroups);
app.get('/api/chats/:id',ctrl.getChats);
app.get('/api/friends/:id',ctrl.getFriends);

// app.get('/api/friends/:id',ctrl.middlewarePractice,ctrl.getFriends);
app.post('/api/user/register',ctrl.register);
app.post('/api/user/logout',ctrl.logout);
app.post('/api/user/login',ctrl.login);
app.post('/api/user/current',ctrl.current);
// app.get('/api/chathistory/:room',ctrl.middlewarePractice);
//SOCKETS ENDPOINTS

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
//   });