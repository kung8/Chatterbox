module.exports = {
    getChats: async (req, res, next) => {
        const db = req.app.get('db');
        let { id } = req.params;
        let id1 = `${id}` + ':' + `%`;
        let id2 = `%` + `:` + `${id}`;
        let chats = await db.individual.get_chats({ id1, id2, id });
        if (chats.length !== 0) {
            const array = []
            let users = chats.map(room => {
                const roomArr = room.room_id.split(':')
                const user = roomArr.filter(item => item !== id)
                return user
            }).map(userId => {
                return +userId[0]
            })

            let awaiting = users.map(async id1 => {
                let awaitedUsers = await db.individual.get_chat({ id1, id:+id })
                if(awaitedUsers.length === 0){
                    awaitedUsers = await db.individual.create_unread({id1,id:+id})
                }
                array.push(awaitedUsers[0])
                return array
            })

            Promise.all(awaiting).then(
                (awaitingU) => {
                    awaitingU = awaitingU[0]
                    awaitingU = awaitingU.sort((a, b) => { return b.user_id - a.user_id })
                    res.status(200).send(awaitingU)
                })
        }
    },

    getFriends: async (req, res, next) => {
        const db = req.app.get('db');
        let { id } = req.params;
        let friends = await db.individual.get_friends({ id });
        let friendsCopy = friends.map(async friend => {
            if(!friend.unread){
                let friendCopy1 =  await db.individual.create_unread({id1:friend.id,id:+id})
                return friendCopy1[0]
            } else {
                let friendCopy2 = await db.individual.get_chat({id1:friend.id, id:+id})
                return friendCopy2[0]
            }
        })
        Promise.all(friendsCopy).then(response=>{
            res.status(200).send(response);
        })
    }
}