require('dotenv').config()
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socket = require('socket.io');
const {SERVER_PORT,SESSION_SECRET,CONNECTION_STRING} = process.env;
const ctrl = require('./controller');

const app = express();
app.use(express.json());

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
})

app.use(session({
    secret:SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:600000
    }
}))



const io = socket(app.listen(SERVER_PORT,()=>{
    console.log('Server is running on port '+ SERVER_PORT)
}))

//ENDPOINTS
app.get('/api/users/:id',ctrl.getUsers);
app.get('/api/chats/:id',ctrl.getUsers);
app.get('/api/friends/:id',ctrl.getUsers);
app.post('/api/user/register',ctrl.register);
app.post('/api/user/logout',ctrl.logout);
app.post('/api/user/login',ctrl.login);
app.post('/api/user/current',ctrl.current);

//SOCKETS ENDPOINTS
io.on('connection',function(socket){
    
    socket.on('startChat',async function(data){
        console.log(data)
    })
    
    socket.on('endChat',function(room){
        console.log('ended hit',room)
        socket.leave(room)
    })
})
