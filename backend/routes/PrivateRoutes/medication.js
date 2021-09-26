const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const medicationTimeStampSchema = require("../../Schemas/medicationTimeStamp");
const medicationSchema = require("../../Schemas/medication");

const router = express.Router();





const jwtRequired = passport.authenticate('jwt', {session: false});

//get list of users medication
router.get('/getmedications', jwtRequired, (req, res) => {

    let userMedications ={}

    passport.authenticate('jwt',{session:false},(err,user)=>{
        //if error
        if(err || !user){
            return res.send(err)
        }

        else{
            medicationSchema.find({email:req.body.email}, async (err,doc)=>{
                if(err){
                    throw err;
                }
                userMedications = doc
                return res.send(userMedications);
            })
        }
    })(req,res)
    // return res.send(userReturnObject);
});

//add new medication
router.get('/addnewmedication', jwtRequired, (req, res) => {


    passport.authenticate('jwt',{session:false},(err,user)=>{
        //if error
        if(err || !user){
            return res.send(err)
        }

        else{
            medicationSchema.findOne({email:req.body.email,medicationName:req.body.medicationName}, async (err,doc)=>{
                if(err){
                    throw err;
                }
                if(doc){
                    return res.send("You have already added this Medication")
                }else{
                    const {email,medicationObject} = req.body
                    const newMedication = new medicationSchema({
                        email: email,
                        // medicationName: req.body.medicationName,
                        // dosage:req.body.dosage,
                        // remainingDosages: req.body.remainingDosages,
                        // nextFillDate: req.body.nextFillDate,
                        // timeStamps:[]
                        medicationName: medicationObject.medicationName,
                        dosage:medicationObject.dosage,
                        remainingDosages: medicationObject.remainingDosages,
                        nextFillDate: medicationObject.nextFillDate,
                        timeStamps:[]
                    });
                    await newMedication.save();
                    res.send({
                        message: "successfully created medication"
                    })
                }
            })
        }
    })(req,res)
    // return res.send(userReturnObject);
});

module.exports = router;