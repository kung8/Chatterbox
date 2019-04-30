const bcrypt = require('bcryptjs');

module.exports = {
    // getChatHistory: async(req,res,next)=>{
        //     const db = req.app.get('db');
        //     console.log(req.params)
        //     const {room} = req.params;
        //     const chat = await db.get_room({room})
        //     console.log(chat)
        //     res.status(200).send(chat)    
        // },
        
        // middlewarePractice:(req,res,next)=>{
        //     console.log('Hey I was hit first!')
        //     next()
        // },
        
        
        getChats: async (req,res,next)=>{
            const db = req.app.get('db');
            let {id}= req.params;
            let id1 =`${id}`+':'+`%`;
            let id2 =`%`+`:`+`${id}`;
            let chats = await db.get_chats({id1,id2,id});            
            if(chats.length !==0){
                const array = []
                let users = chats.map(room=>{
                    const roomArr = room.room_id.split(':')
                    const user = roomArr.filter(item=>{
                        if(item != id){
                            return item
                        } 
                    })
                    return user
                }).map(userId => {
                    return +userId[0]
                })       

                let awaiting = users.map(async id1 =>{
                        let awaitedUsers = await db.get_chat({id1})
                        array.push(awaitedUsers[0])
                        return array
                    })
        
                Promise.all(awaiting).then(
                    (awaitingU)=>{
                        awaitingU = awaitingU[0]
                        awaitingU = awaitingU.sort((a,b)=>{return b.user_id - a.user_id })
                        res.status(200).send(awaitingU)
                    })
            }
        },
        
        getFriends: async (req,res,next)=>{
        const db = req.app.get('db');
        let {id}= req.params;
        let friends = await db.get_friends({id});
        res.status(200).send(friends)
    },

    register: async (req,res) => {
        const db = req.app.get('db');
        const {first,last,email,password,username} = req.body;
        let checkedUser1 = await db.check_email({email});
        checkedUser1 = checkedUser1[0] 
        //if the email is equal to an existing email in the db then return 'this email is already in the db, please input another email'
        if(checkedUser1){
            return res.sendStatus(409)
        };

        //if the username is available then continue registering.
        let checkedUser2 = await db.check_username({username})

        checkedUser2 = checkedUser2[0]
        
        if(checkedUser2){
            return res.sendStatus(409)
        };
        
        //Need to hash their password before registering
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);
        let newUser = await db.register({first,last,email,password:hash,username});
        newUser = newUser[0];
        req.session.user = newUser;
        res.status(200).send(req.session.user);
    },

    login: async (req,res) => {
        const db = req.app.get('db');
        const {username,password} = req.body;
        let user = await db.check_username({username});
        user = user[0];
        if(!user){
            return res.status(401).send('username not found')
        } 
        let authenticated = bcrypt.compareSync(password,user.password);
        if(authenticated){
            delete user.password;
            req.session.user = user;
            res.status(200).send(req.session.user);
        } else {
            return res.status(401).send('password is incorrect');
        }
    }, 

    current: async (req,res) =>{
        const db = req.app.get('db');
        const {user} = req.session
        if(user){
            res.status(200).send(user);
        } else {
            res.sendStatus(401);
        }
    },

    logout: (req,res)=>{
        req.session.destroy(function(){
            res.status(200).send('Logged Out Connected!')
        });
    }
}