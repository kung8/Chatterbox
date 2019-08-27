require('dotenv').config()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socket = require('socket.io');

const IndCtrl = require('./controllers/IndController');
const AuthCtrl = require('./controllers/AuthController');
const GroupCtrl = require('./controllers/GroupController');
const SocketCtrl = require('./controllers/SocketController');

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

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    const io = socket(app.listen(SERVER_PORT, () => {
        console.log('Server is running on port ' + SERVER_PORT)
    }))
    
    //SOCKET ENDPOINTS
    io.on('connection', socket => {
        SocketCtrl.socketListeners(socket,db,io)
    })
})

//AUTH ENDPOINTS
app.post('/api/user/register', AuthCtrl.register);
app.post('/api/user/logout', AuthCtrl.logout);
app.post('/api/user/login', AuthCtrl.login);
app.post('/api/user/current', AuthCtrl.current);
app.put('/api/user/edit', AuthCtrl.editProfile);
app.put('/api/user/availability',AuthCtrl.changeAvailability);

//GROUP ENDPOINTS
app.get('/api/chats/group/getAll/:user_id', GroupCtrl.getGroups);
app.post('/api/chat/group/create', GroupCtrl.createGroup);
app.get('/api/getGroupChat/:id', GroupCtrl.getGroupChat);
app.get('/api/group/members/:group_chat_id',GroupCtrl.getMembers);
app.put('/api/group/members/:group_chat_id',GroupCtrl.updateGroup);

//INDIVIDUAL ENDPOINTS
app.get('/api/chats/:id', IndCtrl.getChats);
app.get('/api/friends/:id', IndCtrl.getFriends);