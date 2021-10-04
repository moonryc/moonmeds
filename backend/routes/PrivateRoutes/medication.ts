import express = require('express');
import passport = require('passport');
import mongoose = require("mongoose");

// const medicationSchema = require('../../Schemas/medication');
import {
    doesUserAlreadyHaveThisMedication,
    getUserMedicationByIdAndUpdate,
    getUserMedicationsArray,
    MedicationModel
} from "../../Schemas/medication";
import {IBackendResponse} from "../../Types/BackendResponseType";
import {IMedicationSchema} from "../../Types/MedicationType";


const medicationTimeStampSchema = require('../../Schemas/medicationTimeStamp');
const medicationRouter = express.Router();


const jwtRequired = passport.authenticate('jwt', {session: false});


//get list of users medication
medicationRouter.get('/userMedications', jwtRequired, (req, res) => {

    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.errorMessage = "Error in authenticating user";
            return res.send(response)
        } else {

            try {
                const userMedications: IMedicationSchema[] = await getUserMedicationsArray(user.userId)
                response.error = false
                response.errorMessage = ''
                response.response = userMedications
                return res.send(response)
            } catch (e) {
                console.log(e)
                response.error = true
                response.errorMessage="error message is located in the response under errorMessage"
                response.response={errorMessage:e}
                return res.send(response)
            }
        }
    })(req, res)
});

//add new medication
medicationRouter.post('/addnewmedication', jwtRequired, (req, res) => {
    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error

        if (err || !user) {
            response.error = true;
            response.errorMessage = "Error in authenticating user";
            return res.send(response)

        } else {
            if (await doesUserAlreadyHaveThisMedication(user.userId, req.body)) {
                response.error = true;
                response.errorMessage = "Medication already exits";
                return res.send(response)
            } else {

                //add in the new randomly generated _id and the userId
                req.body.userId = user.userId
                req.body._id = new mongoose.Types.ObjectId().toString()

                let newMedication:IMedicationSchema = req.body
                const medication = new MedicationModel(newMedication)

                await medication.save();

                response.error = false;
                response.errorMessage = "";
                response.response = {}
                return res.send(response)
            }
        }
    })(req, res)
});

//update medication
//add new medication
medicationRouter.put('/updatemedication', jwtRequired, (req, res) => {
    console.log(req.body)
    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }
    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            console.log("error:" + err)
            return res.send(err)
        } else {

            let update: string | boolean = await getUserMedicationByIdAndUpdate(req.body._id, req.body)
            if (update) {

                response.error = true
                if (typeof update === "string") {
                    response.errorMessage = update
                }
                return res.send(response)
            } else {
                return res.send(response)
            }
        }
    })(req, res)
    // return res.send(userReturnObject);
});


export default medicationRouter;