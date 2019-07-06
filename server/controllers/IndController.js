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
        res.status(200).send(friends);
    }
}