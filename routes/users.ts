import express = require('express');
import bcrypt = require("bcryptjs");
import UserModel from "../Schemas/UserSchema";
import passport = require("passport");
import issueJWT from "../middleware/issueJwt";
import addPerson from "../services/users/addPerson";
import removePerson from "../services/users/removePerson";
import getPersons from "../services/users/getPersons";
import getUserMedications from "../services/medication/getUserMedications";
import getUserMedicationDosages from "../services/medication/getUserMedicationDosages";
import {Request, Response} from "express";
import {IApiResponse} from "../Types/ApiResponse";

const router = express.Router();


const JwtAuthenticate = passport.authenticate('jwt', {session: false});


let apiResponse:IApiResponse ={
    error: false,
    errorMessage: "",
    payload: undefined,
}


router.get('/callback', JwtAuthenticate, (req: any, res: any, next) => {
        return res.status(200).json({success: true, msg: "you are authorized"})
    });

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
        await getPersons(req).then(data=>response.persons = data!.persons)
        apiResponse.payload = response
        return res.status(200).json(apiResponse)
    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        return res.status(400).json(apiResponse)
    }

})

router.get('/usersPersons', JwtAuthenticate, async (req, res, next) => {

    try {

        await getPersons(req).then(data=> {
            apiResponse.payload = data!.persons
            return res.status(200).json(apiResponse)
        })
    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        return res.status(400).json(apiResponse)
    }
})

router.put('/addPerson', JwtAuthenticate, async (req: Request, res: Response, next) => {
    try {
        await addPerson(req, res).then(r=>{
            return res.status(200).json(apiResponse)
        }).catch(error=>{
            apiResponse.error = true
            apiResponse.errorMessage = error
            console.log(error)
            return res.status(400).json(apiResponse)
        })

    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        return res.status(400).json(apiResponse)
    }
})

router.put("/removePerson", JwtAuthenticate, (req: Request, res: Response, next) => {
    try {
        removePerson(req, res)
        return res.status(200).json(apiResponse)
    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        return res.status(400).json(apiResponse)
    }
})

router.post('/login', (req: Request, res: Response, next) => {
        if (!req.body.userName) {
            apiResponse.error = true
            apiResponse.errorMessage = "Username is blank"
            return res.status(400).json(apiResponse)
        }
        if (req.body.password == undefined) {
            apiResponse.error = true
            apiResponse.errorMessage = "Password is blank"
            return res.status(400).json(apiResponse)
        } else {
            UserModel.findOne({userName: req.body.userName})
                .then((user) => {
                    if (!user) {
                        apiResponse.error = true
                        apiResponse.errorMessage = "Could not find User"
                        return res.status(400).json(apiResponse)
                    } else {

                        bcrypt.compare(req.body.password, user.hash, (err, isPasswordValid) => {
                            if (isPasswordValid) {
                                const jwt = issueJWT(user)
                                apiResponse.payload = {
                                    user: user,
                                    token: jwt.token,
                                    expiresIn: jwt.expires
                                }
                                return res.status(200).json(apiResponse)
                            } else {
                                apiResponse.error = true
                                apiResponse.errorMessage = "Wrong password entered"
                                res.status(401).json(apiResponse)
                            }
                        })
                    }
                })
                .catch((err) => {
                    apiResponse.error = true
                    apiResponse.errorMessage = err
                    res.status(400).json(apiResponse)
                })
        }
    }
);

router.post('/register', (req: Request, res: Response, next) => {
    try {

        if (!req.body.userName) {
            throw "Username is blank"
        }
        if (!req.body.emailAddress) {
            throw "Email is blank"
        }
        if (!req.body.password) {
            throw "Password is blank"
        }

        //check and see if the email or username already exists
        UserModel.find(
            {$or: [{userName: req.body.userName}, {emailAddress: req.body.emailAddress}]},
            (err: any, user: any) => {
                if (err) {
                    throw err
                }
                if (user.length > 0) {
                    throw "Username or Email already exists"
                } else {
                    const newUser = new UserModel({
                        userName: req.body.userName,
                        hash: bcrypt.hashSync(req.body.password, 10),
                        emailAddress: req.body.emailAddress,
                        persons: []
                    });

                    newUser.save()
                        .then((user: any) => {
                            const jwt = issueJWT(user)
            apiResponse.payload = { user: user, token: jwt.token, expiresIn: jwt.expires}
            return res.status(200).json(apiResponse)

                        })
                        .catch((err: any | string): any => {
                            throw err
                        })
                }
            }
        )


    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        console.log(e)
        return res.status(400).json(apiResponse)
    }

});


export default router;
