const bcrypt = require('bcryptjs');

module.exports = {
    getUsers: async (req,res)=>{
        const db = req.app.get('db');
        let {id}= req.params;
        id = +id
        let users = await db.get_users({id});
        res.status(200).send(users)
    },

    getChats: async (req,res)=>{
        const db = req.app.get('db');
        let {id}= req.params;
        id = +id
        let users = await db.get_users({id});
        res.status(200).send(users)
    },

    getFriends: async (req,res)=>{
        const db = req.app.get('db');
        let {id}= req.params;
        id = +id
        let users = await db.get_users({id});
        res.status(200).send(users)
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