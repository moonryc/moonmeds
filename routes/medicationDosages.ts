import express =require('express')
import passport =require("passport");
import MedicationDosageModel from "../Schemas/MedicationDosageSchema";

const router = express.Router()

const JwtAuthenticate = passport.authenticate('jwt', {session: false});

router.put('/update',JwtAuthenticate,(req,res,next)=>{
    let timeMedicationWasTaken = req.body.timeTaken
    if(typeof timeMedicationWasTaken == typeof ""){
        timeMedicationWasTaken = new Date(timeMedicationWasTaken)
    }else{
        timeMedicationWasTaken = null
    }
    MedicationDosageModel.findOneAndUpdate({dosageId:req.body.dosageId},{hasBeenTaken:req.body.hasBeenTaken,hasBeenMissed:req.body.hasBeenMissed,timeTaken:timeMedicationWasTaken},(err:any,doc:any)=>{
        if(err){
            console.log(err)
            res.status(401).json({error:true,msg:err})
        }else{
            res.status(200).json({error:false,msg:"success"})
        }
    })
})

export default router