var express = require('express');
var sessions = require('express-session')
const app = require("../app");
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const userSchema = require("../Schemas/user");
var router = express.Router();

var session;




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
            let cookie =
            console.log(session.cookie)
            console.log(session.sessionToken)
            res.send({
                error:false,
                userId:session.userid,
                cookie:session.cookie,
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

module.exports = router;
