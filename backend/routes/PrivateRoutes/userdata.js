const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userSchema = require("../../Schemas/user")
const router = express.Router();



//TODO(Moon) understand the point of private routes
//region private routes
const jwtRequired = passport.authenticate('jwt', {session: false});

router.post('/getuserdata', (req, res) => {

    let userReturnObject ={email:null,picture:null}
    passport.authenticate('jwt',{session:false},(err,user)=>{
        //if error
        if(err || !user){
            return res.send(err)
        }

        else{
            userSchema.findById(req.body, async (err,doc)=>{
                if(err){
                    return res.send(err)
                }
                if(!doc){
                    return res.send("user does not exist")
                }

                if(doc){
                    return res.send(doc)
                }


            })
        }
    })(req,res)
    // return res.send(userReturnObject);

});
//endregion

module.exports = router;