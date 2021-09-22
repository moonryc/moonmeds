const userSchema = require("../Schemas/user");
const medicationTimeStampSchema = require("../Schemas/medicationTimeStamp");
const medicationSchema = require("../Schemas/medication");
var express = require('express');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
var router = express.Router();




router.post('/submitNewMedication', (req, res, next) => {

    medicationSchema.findOne({email:req.body.email, medicationName:req.body.medicationName, dosage:req.body.dosage}, async (err, doc) => {
        //if error
        if (err) {
            throw err;
        }
        //if medication already exists
        if (doc) {
            res.send({
                message: 'Medication already exists'
            })
            console.log("Medication already exists")
        }
        //if medication does nto already exist
        if (!doc) {
            const newMedication = new medicationSchema({
                email: req.body.email,
                medicationName: req.body.medicationName,
                dosage: req.body.dosage,
                remainingDosages: req.body.remainingDosages,
                nextFillDate: req.body.nextFillDate,
            });
            await newMedication.save();
            res.send({
                createdNewMedication: true
            })
            console.log("Medication is new")
        }
    })
})

router.post('/submitEditOldMedication', (req, res, next) => {

    //TODO make existing data in the database editable
})

router.post('/submitMedicationTimeStamp', (req, res, next) => {

    //TODO add time property to this
    medicationTimeStampSchema.findOne({email:req.body.email, medicationName:req.body.medicationName}, async (err, doc) => {
        //if error
        if (err) {
            throw err;
        }
        //if medication already exists
        if (doc) {
            res.send({
                message: 'Medication already exists'
            })
            console.log("Medication already exists")
        }
        //if medication does nto already exist
        if (!doc) {
            const newMedication = new medicationSchema({
                email: req.body.email,
                medicationName: req.body.medicationName,
            });
            await newMedication.save();
            res.send({
                createdNewMedication: true
            })
            console.log("Medication is new")
        }
    })
})

router.post('/submitEditMedicationTimeStamp', (req, res, next) => {

    //TODO make existing time stamp
})

module.exports = router;