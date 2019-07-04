require('dotenv').config()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socket = require('socket.io');

const IndCtrl = require('./controllers/IndController');
const AuthCtrl = require('./controllers/AuthController');
const GroupCtrl = require('./controllers/GroupController');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))

const io = socket(app.listen(SERVER_PORT, () => {
    console.log('Server is running on port ' + SERVER_PORT)
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

//AUTH ENDPOINTS
app.post('/api/user/register', AuthCtrl.register);
app.post('/api/user/logout', AuthCtrl.logout);
app.post('/api/user/login', AuthCtrl.login);
app.post('/api/user/current', AuthCtrl.current);
app.put('/api/user/edit', AuthCtrl.editProfile)

//CHAT ENDPOINTS
app.get('/api/chats/group/getAll/:user_id', GroupCtrl.getGroups);
app.post('/api/chat/group/create', GroupCtrl.createGroup);
app.get('/api/getGroupChat/:id', GroupCtrl.getGroupChat);

app.get('/api/chats/:id', IndCtrl.getChats);
app.get('/api/friends/:id', IndCtrl.getFriends);

//SOCKET ENDPOINTS
io.on('connection', socket => {
    const db = app.get('db')
    //Individual Chats
    socket.on('startChat', async (room) => {
        let messages = await db.individual.get_room(room)
        if (messages[0]) {
            socket.join(room.room);
            io.in(room.room).emit('startChat', messages)
        } else {
            await db.individual.create_room(room)
            socket.join(room)
            io.in(room).emit('startChat', messages)
        }
    })
    socket.on('sendMsg', async (data)=>{
        const {message,id,room} = data;
        const messages = await db.individual.create_message({message,id,room})
        io.in(room).emit('sendMsg',messages)
    })

    //Group Chats
    socket.on('startGroupChat', async (data)=>{
        const {room} = data
        const messages = await db.group.get_group_chat({id:room})
        socket.join(room)
        io.in(room).emit('startGroupChat',messages)
    })
    socket.on('sendGroupMsg', async (data)=>{
        const {room,id,message} = data
        const messages = await db.group.create_group_message({room,id,message})
        io.in(room).emit('sendGroupMsg',messages)
    })
    socket.on('endChat', room => socket.leave(room))
})
