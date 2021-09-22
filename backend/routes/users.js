var express = require('express');
var sessions = require('express-session')
const app = require("../app");
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const userSchema = require("../Schemas/user");
var router = express.Router();

var session;


//region Homepage

router.post('/', (req, res, next) => {
    session = req.session;
    if(session.userid){
        //TODO I DONT FUCKING KNOW
    }
});

//endregion

//region Login

router.post('/submitLogin', (req, res, next) => {
    userSchema.findOne({email:req.body.email, password:req.body.password}, async (err, doc) => {
        //if error
        if (err) {
            throw err;
        }
        //if username and password are correct
        if (doc) {
            session=req.session;
            session.userid=req.body.email;
            console.log(req.session)
            res.send({
                error:false,
            })
        }
        //if user does not exist/ password is incorrect
        if (!doc) {
            res.send({
                error:true,
                message: 'Username or password is incorrect'
            })
            console.log("Username or password is incorrect")
        }
    })
});

//endregion

//region Signup

router.post('/submitSignup', (req, res, next) => {

    userSchema.findOne({email:req.body.email}, async (err, doc) => {
        //if error
        if (err) {
            throw err;
        }
        //if user already exists
        if (doc) {
            res.send({
                createdNewUser: false,
                message: 'User already exist'
            })
            console.log("user exists")
        }
        //if user does nto already exist
        if (!doc) {
            const hashedPassword = req.body.password
            //TODO hash the password
            // const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new userSchema({
                email: req.body.email,
                password: hashedPassword
            });
            await newUser.save();
            res.send({
                createdNewUser: true
            })
            console.log("user is new")
        }
    })
})


//endregion

//region Logout

router.get('/submitlogout', (req, res, next) => {
    req.session.destroy();
    console.log("session destroyed");
    res.send({message:"session destroyed"})
});

//endregion

module.exports = router;
