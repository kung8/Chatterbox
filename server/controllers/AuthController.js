const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const { first, last, email, password, username, pic } = req.body;
        let checkedUser1 = await db.auth.check_email({ email });
        checkedUser1 = checkedUser1[0]
        //if the email is equal to an existing email in the db then return 'this email is already in the db, please input another email'
        if (checkedUser1) {
            return res.sendStatus(409)
        };

        //if the username is available then continue registering.
        let checkedUser2 = await db.auth.check_username({ username })

        checkedUser2 = checkedUser2[0]

        if (checkedUser2) {
            return res.sendStatus(409)
        };

        //Need to hash their password before registering
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.auth.register({ first, last, email, password: hash, username, pic ,active:'active'});
        newUser = newUser[0];
        req.session.user = newUser;
        res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        let user = await db.auth.check_username({ username });
        user = user[0];
        if (!user) {
            return res.status(401).send('username not found')
        }
        let authenticated = bcrypt.compareSync(password, user.password);
        if (authenticated) {
            user = await db.auth.make_active({username})
            user = user[0]
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

    logout: async(req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        await db.auth.not_active({id})
        req.session.destroy(function () {
            res.status(200).send('Logged Out Connected!')
        });
    },

    editProfile:async(req,res)=>{
        const {first,last,email,pic,username} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')
        const emailCheck = await db.auth.edit_check_email({id,email})
        const usernameCheck = await db.auth.edit_check_username({id,username})
        if(emailCheck.length || usernameCheck.length){
            return res.status(409)
        }
        let user = await db.auth.update_user({id,first,last,email,pic,username})
        user = user[0]
        delete user.password
        req.session.user = user
        res.status(200).send(req.session.user)
    },

    changeAvailability:async(req,res)=>{
        const db = req.app.get('db')
        const {id} = req.session.user
        const {active} = req.body
        let user = await db.auth.update_active({id,active})
        user = user[0]
        delete user.password
        req.session.user = user
        res.status(200).send(req.session.user)
    }
}