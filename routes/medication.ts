import express = require('express');
import passport = require("passport");
import createNewMedication from "../services/medication/newMedication";
import updateMedication from "../services/medication/updateMedication";
import convertMedicationBodyRequestHeaderDates from "../middleware/convertMedicationBodyRequestHeaderDates";
import removeMedications from "../services/medication/removeMedications";
import MedicationModel from "../Schemas/MedicationSchema";
import getUserMedications from "../services/medication/getUserMedications";


const router = express.Router();


const JwtAuthenticate = passport.authenticate('jwt', {session: false});

router.get("/userMedications",JwtAuthenticate,(req,res,next)=>{
    getUserMedications(req)
})

router.put('/removeMedications', JwtAuthenticate, (req, res, next) => {
    try {
        removeMedications(req, res)
        res.status(200).json({error: false, msg: "success"})
    } catch (e) {
        res.status(401).json({error: true, msg: e})
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
router.put('/newMedication', JwtAuthenticate, (req, res, next) => {
    try {
        createNewMedication(req, res)
        res.status(200).json({error: false, msg: " New Medication Added "})
    } catch (e) {
        console.log(e)
        res.status(401).json({error: true, msg: e})
    }
});

/**
 * Updates an existing medication
 */
router.put('/updateMedication', JwtAuthenticate, (req, res, next) => {
    try {
        updateMedication(req, res)
        res.status(200).json({error: false, msg: "Medication has been updated"})
    } catch (e) {
        console.log(e)
        res.status(401).json({error: true, msg: e})
    }

})


export default router