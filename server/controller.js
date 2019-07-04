const bcrypt = require('bcryptjs');

module.exports = {
    getGroupChat: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const groupChat = await db.get_group_chat({ id })
        res.status(200).send(groupChat)
    },
    // getChatHistory: async(req,res,next)=>{
    //     const db = req.app.get('db');
    //     console.log(req.params)
    //     const {room} = req.params;
    //     const chat = await db.get_room({room})
    //     console.log(chat)
    //     res.status(200).send(chat)    
    // },

    createGroup: async (req, res) => {
        const { group, name } = req.body;
        const db = req.app.get('db')
        const newGroup = await db.create_group({ name })
        const { group_chat_id } = newGroup[0]
        const addedUser = group.map(async user_id => {
            return await db.add_user_to_group({ group_chat_id, user_id })
        })
        Promise.all(addedUser).then(() => res.sendStatus(200))
    },

    getGroups: async (req, res) => {
        const { user_id } = req.params
        const db = req.app.get('db')
        const groups = await db.get_all_user_groups({ user_id })
        res.status(200).send(groups)
    },

    getChats: async (req, res, next) => {
        const db = req.app.get('db');
        let { id } = req.params;
        let id1 = `${id}` + ':' + `%`;
        let id2 = `%` + `:` + `${id}`;
        let chats = await db.get_chats({ id1, id2, id });
        if (chats.length !== 0) {
            const array = []
            let users = chats.map(room => {
                const roomArr = room.room_id.split(':')
                const user = roomArr.filter(item => {
                    if (item != id) {
                        return item
                    }
                })
                return user
            }).map(userId => {
                return +userId[0]
            })

            let awaiting = users.map(async id1 => {
                let awaitedUsers = await db.get_chat({ id1 })
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
        let friends = await db.get_friends({ id });
        res.status(200).send(friends)
    },

    register: async (req, res) => {
        const db = req.app.get('db');
        const { first, last, email, password, username, pic } = req.body;
        let checkedUser1 = await db.check_email({ email });
        checkedUser1 = checkedUser1[0]
        //if the email is equal to an existing email in the db then return 'this email is already in the db, please input another email'
        if (checkedUser1) {
            return res.sendStatus(409)
        };

        //if the username is available then continue registering.
        let checkedUser2 = await db.check_username({ username })

        checkedUser2 = checkedUser2[0]

        if (checkedUser2) {
            return res.sendStatus(409)
        };

        //Need to hash their password before registering
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.register({ first, last, email, password: hash, username, pic });
        newUser = newUser[0];
        req.session.user = newUser;
        res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        let user = await db.check_username({ username });
        user = user[0];
        if (!user) {
            return res.status(401).send('username not found')
        }
        let authenticated = bcrypt.compareSync(password, user.password);
        if (authenticated) {
            delete user.password;
            req.session.user = user;
            res.status(200).send(req.session.user);
        } else {
            return res.status(401).send('password is incorrect');
        }
    },

    current: async (req, res, next) => {
        const db = req.app.get('db');
        const { user } = req.session
        if (user) {
            res.status(200).send(user);
        } else {
            res.sendStatus(401);
        }
        next()
    },

    logout: (req, res) => {
        req.session.destroy(function () {
            res.status(200).send('Logged Out Connected!')
        });
    },

    editProfile:async(req,res)=>{
        const {first,last,email,pic,username} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')
        const emailCheck = await db.edit_check_email({id,email})
        const usernameCheck = await db.edit_check_username({id,username})
        if(emailCheck.length || usernameCheck.length){
            return res.status(409)
        }
        let user = await db.update_user({id,first,last,email,pic,username})
        user = user[0]
        delete user.password
        req.session.user = user
        res.status(200).send(req.session.user)
    }

}