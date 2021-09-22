var express = require('express');

const app = require("../app");
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const userSchema = require("../Schemas/user");
var router = express.Router();


//region Login

router.post('/submitLogin', (req, res, next) => {
//TODO complete login
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

module.exports = router;
