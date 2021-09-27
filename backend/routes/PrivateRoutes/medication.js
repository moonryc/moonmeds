const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const medicationSchema = require('../../Schemas/medication')
const medicationTimeStampSchema = require('../../Schemas/medicationTimeStamp')
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
router.post('/addnewmedication', jwtRequired, (req, res) => {
    console.log(req.body)

    passport.authenticate('jwt',{session:false},(err,user)=>{
        //if error
        if(err || !user){
            console.log("error:" + err)
            return res.send(err)
        }else{
            medicationSchema.findOne({userId:user.userId,medicationName:req.body.medicationDetails.prescriptionName}, async (err,doc)=>{
                if(err){
                    console.log("err "+err)
                    throw err;
                }
                if(doc){
                    console.log("doc medication"+doc)
                    return res.send("You have already added this Medication")
                }else{
                    const newMedication = new medicationSchema({
                        userId: user.userId,
                        medicationName: req.body.medicationDetails.prescriptionName,
                        dosage:req.body.medicationDetails.prescriptionDosage,
                        remainingDosages: req.body.medicationDetails.remainingDosages,
                        nextFillDate: req.body.medicationDetails.userNotes,
                        userNotes: req.body.medicationDetails.userNotes,
                        doses: req.body.dosageDetails
                    });
                    await newMedication.save();
                    res.send({
                        message: "successfully created medication"
                    })
                }
            })

            // medicationTimeStampSchema.findOne({userId:user.userId,medicationName:req.body.medicationDetails.prescriptionName}, async (err,doc)=>{
            //     if(err){
            //         console.log("err "+err)
            //         throw err;
            //     }
            //     if(doc){
            //         console.log("doc timestamp"+doc)
            //         return res.send("You have already added this Medication")
            //     }else{
            //         const newDosage = new medicationTimeStampSchema({
            //             userId:user.userId,
            //             medicationName:req.body.medicationDetails.prescriptionName,
            //             dosages: req.body.dosageDetails,
            //             medicationDays:req.body.dosageDetails.medicationDays
            //         });
            //         await newDosage.save();
            //         res.send({
            //             message: "successfully created medication dosage"
            //         })
            //     }
            // })
        }
    })(req,res)
    // return res.send(userReturnObject);
});

module.exports = router;