import express = require('express');
import bcrypt = require("bcryptjs");
import UserModel from "../Schemas/UserSchema";
import passport = require("passport");
import issueJWT from "../Middleware/issueJwt";
import addPerson from "../services/users/addPerson";
import removePerson from "../services/users/removePerson";
import newUser from "../services/users/newUser";
import getPersons from "../services/users/getPersons";
import getUserMedications from "../services/medication/getUserMedications";
import getUserMedicationDosages from "../services/medication/getUserMedicationDosages";


const router = express.Router();


const JwtAuthenticate = passport.authenticate('jwt', {session: false});


router.get('/callback', JwtAuthenticate, (req, res, next) => {

        // res.status(200).json({success: true, msg: "you are authorized"})
    let response = {
        error:false,
        medicationArray:null,
        medicationDosagesArray:null,
        persons:null,
        msg:null
    }

    try{
        response.medicationArray = getUserMedications(req)
        response.medicationDosagesArray = getUserMedicationDosages(req)
        response.persons =getPersons(req)
        res.status(200).json(response)
    }catch (e) {
        console.log(e)
        response.error = true
        response.msg = e
        res.status(401).json(response)
    }
    }
);

router.get("/userData",JwtAuthenticate,(req,res,next)=>{
    let response = {
        error:false,
        medicationArray:null,
        medicationDosagesArray:null,
        persons:null,
        msg:null
    }

    try{
        response.medicationArray = getUserMedications(req)
        response.medicationDosagesArray = getUserMedicationDosages(req)
        response.persons =getPersons(req)
        res.status(200).json(response)
    }catch (e) {
        console.log(e)
        response.error = true
        response.msg = e
        res.status(401).json(response)
    }

})

router.get('/usersPersons', JwtAuthenticate,(req,res,next)=>{
    try{
        let persons = getPersons(req)
        res.status(200).json({error:false,persons:persons})
    }catch (e) {
        res.status(200).json({error:true,msg:e})
    }
})

router.put('/addPerson', JwtAuthenticate, (req, res, next) => {
    try {
        addPerson(req, res)
    } catch (e) {
        res.status(401).json({error: true, msg: e})
    }
})

router.put("/removePerson", JwtAuthenticate, (req, res, next) => {
    try {
        removePerson(req, res)
    } catch (e) {
        res.status(401).json({error: true, msg: e})
    }
})

router.post('/login', (req, res, next) => {
        UserModel.findOne({userName: req.body.userName})
            .then((user) => {
                if (!user) {
                    res.status(401).json({success: false, msg: "could not find users"})
                } else {

                    bcrypt.compare(req.body.password, user.hash, (err, isPasswordValid) => {
                        if (isPasswordValid) {
                            const jwt = issueJWT(user)
                            res.status(200).json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
                        } else {
                            res.status(401).json({success: false, msg: "Wrong password entered"})
                        }
                    })
                }
            })
            .catch((err) => res.send(err))
    }
);

router.post('/register', (req, res, next) => {
    try {
        newUser(req, res)
    } catch (e) {
        return res.status(401).json({error: true, msg: e})
    }

});



export default router;
