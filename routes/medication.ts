//@ts-nocheck
import express = require('express');
import passport = require("passport");
import createNewMedication from "../services/medication/newMedication";
import updateMedication from "../services/medication/updateMedication";
import convertMedicationBodyRequestHeaderDates from "../middleware/convertMedicationBodyRequestHeaderDates";
import removeMedications from "../services/medication/removeMedications";
import MedicationModel from "../Schemas/MedicationSchema";
import getUserMedications from "../services/medication/getUserMedications";
import {IApiResponse} from "../Types/ApiResponse";

const router = express.Router();
const JwtAuthenticate = passport.authenticate('jwt', {session: false});

let apiResponse:IApiResponse ={
    error: false,
    errorMessage: "",
    payload: undefined
}

router.get("/userMedications",JwtAuthenticate, async (req,res,next)=>{

    try{
        await getUserMedications(req).then(response=>apiResponse.payload = response)
        return res.status(200).json(apiResponse)
    }catch (e) {
        apiResponse.error=true
        apiResponse.errorMessage = e
        return res.status(400).json(apiResponse)
    }

})

router.put('/removeMedications', JwtAuthenticate, (req, res, next) => {
    try {
        removeMedications(req, res)
        return res.status(200).json(apiResponse)
    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        return res.status(400).json(apiResponse)
    }

})

//Middleware
/**
 * ConvertBody ensures that all of the dates from the req.body (for these requests)
 * are immedietly parsed into ISO Dates
 */
router.use(convertMedicationBodyRequestHeaderDates)

/**
 * Creates a new medication
 */
router.put('/newMedication', JwtAuthenticate, async (req, res, next) => {
    try {
        await createNewMedication(req, res)
        res.status(200).json(apiResponse)
    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        res.status(400).json(apiResponse)
    }
});

/**
 * Updates an existing medication
 */
router.put('/updateMedication', JwtAuthenticate, async (req, res, next) => {
    try {
        await updateMedication(req, res).then(response=>res.status(200).json(apiResponse))

    } catch (e) {
        apiResponse.error = true
        apiResponse.errorMessage = e
        res.status(400).json(apiResponse)
    }

})


export default router