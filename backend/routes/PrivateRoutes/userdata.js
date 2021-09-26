const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const medicationSchema = require("../../Schemas/medication");

const router = express.Router();



//TODO(Moon) understand the point of private routes
//region private routes
const jwtRequired = passport.authenticate('jwt', {session: false});

router.get('/getuserdata', (req, res,next) => {

    let userReturnObject ={email:null,picture:null}
    passport.authenticate('jwt',{session:false},(err,user)=>{
        //if error
        if(err || !user){
            return res.send(err)
        }

        else{
            return res.send(user)
        }
    })(req,res)
    // return res.send(userReturnObject);

});
//endregion

module.exports = router;