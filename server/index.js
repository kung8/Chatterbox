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

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    const io = socket(app.listen(SERVER_PORT, () => {
        console.log('Server is running on port ' + SERVER_PORT)
    }))
    
    //SOCKET ENDPOINTS
    io.on('connection', socket => {
        const db = app.get('db')
        //Individual Chats
        socket.on('startChat', async (data) => {
            const {room, id,friend_id} = data
            let messages = await db.individual.get_room({room})
            await db.individual.update_unread({id,friend_id,unread:0})
            if (messages[0]) {
                socket.join(room);
                io.in(room).emit('startedChat', messages)
            } else {
                await db.individual.create_room({room})
                socket.join(room)
                io.in(room).emit('startedChat', messages)
            }
        })
        socket.on('sendMsg', async (data)=>{
            const {message,id,room,friend_id} = data;
            const messages = await db.individual.create_message({message,id,room})
            let user = await db.individual.find_unread_user({id,friend_id})
            if(user.length === 0 ){
                await db.individual.create_unread({id1:id,id:friend_id})
            } else {
                let unread = ++user[0].unread
                await db.individual.update_unread({id,friend_id, unread})
            }
            io.in(room).emit('receiveMsg',{messages,id,room,friend_id})
        })
        socket.on('notifySend',async ()=>{
            io.emit('notifyReceived')
        })
        socket.on('updateActive',async(data)=>{
            io.emit('updateActive',data)
        })    
        //Group Chats
        socket.on('startGroupChat', async (data)=>{
            const {room} = data
            const messages = await db.groups.get_group_chat({id:room})
            socket.join(room)
            io.in(room).emit('startGroupChat',messages)
        })
        socket.on('sendGroupMsg', async (data)=>{
            const {room,id,message} = data
            const messages = await db.groups.create_group_message({room,id,message})
            io.in(room).emit('sendGroupMsg',messages)
        })
        socket.on('endChat', room => {
            socket.leave(room)
            io.emit('chatEnded')
        })
    })
})

//AUTH ENDPOINTS
app.post('/api/user/register', AuthCtrl.register);
app.post('/api/user/logout', AuthCtrl.logout);
app.post('/api/user/login', AuthCtrl.login);
app.post('/api/user/current', AuthCtrl.current);
app.put('/api/user/edit', AuthCtrl.editProfile);
app.put('/api/user/availability',AuthCtrl.changeAvailability);

//CHAT ENDPOINTS
app.get('/api/chats/group/getAll/:user_id', GroupCtrl.getGroups);
app.post('/api/chat/group/create', GroupCtrl.createGroup);
app.get('/api/getGroupChat/:id', GroupCtrl.getGroupChat);

app.get('/api/chats/:id', IndCtrl.getChats);
app.get('/api/friends/:id', IndCtrl.getFriends);