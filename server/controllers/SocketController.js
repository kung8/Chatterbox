module.exports = {
    socketListeners: (socket, db, io) => {
        //Individual Chats
        socket.on('startChat', async (data) => {
            const { room, id, friend_id } = data
            let messages = await db.individual.get_room({ room })
            await db.individual.update_unread({ id, friend_id, unread: 0 })
            if (messages[0]) {
                socket.join(room);
                io.in(room).emit('startedChat', messages)
            } else {
                await db.individual.create_room({ room })
                socket.join(room)
                io.in(room).emit('startedChat', messages)
            }
        })
        socket.on('sendMsg', async (data) => {
            const { message, id, room, friend_id } = data;
            const messages = await db.individual.create_message({ message, id, room })
            let user = await db.individual.find_unread_user({ id, friend_id })
            if (user.length === 0) {
                await db.individual.create_unread({ id1: id, id: friend_id })
            } else {
                let unread = ++user[0].unread
                await db.individual.update_unread({ id, friend_id, unread })
            }
            io.in(room).emit('receiveMsg', { messages, id, room, friend_id })
        })
        socket.on('notifySend', async () => {
            io.emit('notifyReceived')
        })
        socket.on('updateActive', async (data) => {
            io.emit('updateActive', data)
        })
        //Group Chats
        socket.on('startGroupChat', async (data) => {
            const { room } = data
            const messages = await db.groups.get_group_chat({ id: room })
            socket.join(room)
            io.in(room).emit('groupChatStarted', messages)
        })
        socket.on('sendGroupMsg', async (data) => {
            const { room, id, message } = data
            const messages = await db.groups.create_group_message({ room, id, message })
            io.in(room).emit('sentGroupMsg', messages)
        })
        socket.on('endChat', async data => {
            const { room, id, friend_id } = data
            await db.individual.update_unread({ id: friend_id, friend_id: id, unread: 0 })
            socket.leave(room)
            io.emit('chatEnded')
        })
    }
}