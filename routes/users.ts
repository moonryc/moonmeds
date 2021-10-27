import express = require('express');
import bcrypt = require("bcryptjs");
import UserModel from "../Schemas/UserSchema";
import passport = require("passport");
import issueJWT from "../middleware/issueJwt";
import addPerson from "../services/users/addPerson";
import removePerson from "../services/users/removePerson";
import newUser from "../services/users/newUser";
import getPersons from "../services/users/getPersons";
import getUserMedications from "../services/medication/getUserMedications";
import getUserMedicationDosages from "../services/medication/getUserMedicationDosages";
import {Request, Response} from "express";

const router = express.Router();


const JwtAuthenticate = passport.authenticate('jwt', {session: false});


router.get('/callback', JwtAuthenticate, (req: any, res: any, next) => {
        res.status(200).json({success: true, msg: "you are authorized"})
    }
);

router.get("/userData", JwtAuthenticate, async (req: any, res, next) => {
    try {
        let response:{error:boolean,medicationArray:any,medicationDosagesArray:any,persons:any} = {
            error: false,
            medicationArray: [],
            medicationDosagesArray: [],
            persons: [],
        }
        await getUserMedications(req).then(data=>response.medicationArray = data)
        await getUserMedicationDosages(req).then(data=>response.medicationDosagesArray = data)
        await getPersons(req).then(data=>response.persons = data.persons)

        res.status(200).json(response)
    } catch (e) {
        res.status(401).json({error: true, msg: e})
    }

})

router.get('/usersPersons', JwtAuthenticate, (req, res, next) => {
    try {
        let persons = getPersons(req)
        res.status(200).json({error: false, persons: persons})
    } catch (e) {
        res.status(200).json({error: true, msg: e})
    }
})

router.put('/addPerson', JwtAuthenticate, (req: Request, res: Response, next) => {
    try {
        addPerson(req, res)
    } catch (e) {
        res.status(401).json({error: true, msg: e})
    }
})

router.put("/removePerson", JwtAuthenticate, (req: Request, res: Response, next) => {
    try {
        removePerson(req, res)
    } catch (e) {
        res.status(401).json({error: true, msg: e})
    }
})

router.post('/login', (req: Request, res: Response, next) => {
        if (!req.body.userName) {
            return res.status(401).json({msg: "Username is blank"})
        }
        if (req.body.password == undefined) {
            return res.status(401).json({msg: "Password is blank"})
        } else {
            UserModel.findOne({userName: req.body.userName})
                .then((user) => {
                    if (!user) {
                        return res.status(401).json({success: false, msg: "could not find users"})
                    } else {

                        bcrypt.compare(req.body.password, user.hash, (err, isPasswordValid) => {
                            if (isPasswordValid) {
                                const jwt = issueJWT(user)
                                return res.status(200).json({
                                    success: true,
                                    user: user,
                                    token: jwt.token,
                                    expiresIn: jwt.expires
                                })
                            } else {
                                res.status(401).json({success: false, msg: "Wrong password entered"})
                            }
                        })
                    }
                })
                .catch((err) => res.send(err))
        }
    }
);

router.post('/register', (req: Request, res: Response, next) => {
    try {
        newUser(req, res)
    } catch (e) {
        return res.status(401).json({error: true, msg: e})
    }

});


export default router;
