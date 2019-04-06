const bcrypt = require('bcryptjs');

module.exports = {
    getUsers: async(req,res)=>{
        const db = req.app.get('db');
        let users = await db.get_users();
        // console.log(users)
        res.status(200).send(users)
    },

    register: async (req,res) => {
        const db = req.app.get('db');
        console.log(req.body)
        const {first,last,email,password,username} = req.body;
        
        console.log(typeof email)

        let checkedUser1 = await db.check_email({email});
        console.log(1,checkedUser1)
        checkedUser1 = checkedUser1[0] 
        //if the email is equal to an existing email in the db then return 'this email is already in the db, please input another email'
        if(checkedUser1){
            return res.sendStatus(409)
        };

        //if the username is available then continue registering.
        let checkedUser2 = await db.check_username({username})
        console.log(2,checkedUser2)

        checkedUser2 = checkedUser2[0]
        
        if(checkedUser2){
            return res.sendStatus(409)
        };
        
        //Need to hash their password before registering
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);
        let newUser = await db.register({first,last,email,password:hash,username});
        newUser = newUser[0];
        console.log(3,newUser)

        req.session.user = newUser;
        res.status(200).send(newUser);
    },

    login: async (req,res) => {
        const db = req.app.get('db');
        const {email,password} = req.body;
        let user = await db.users.login({email});
        user = user[0];
        if(!user){
            return res.status(401).send('email not found')
        } 
        let authenticated = bcrypt.compareSync(password,user.password);
        if(authenticated){
            delete user.password;
            req.session.user = user;
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('password is incorrect');
        }
    }, 

    current: async (req,res) =>{
        const db = req.app.get('db');
        if(req.session.user){
            res.status(200).send(req.session.user);
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