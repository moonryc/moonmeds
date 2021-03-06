import express =require('express')
import passport =require("passport");
import MedicationDosageModel from "../Schemas/MedicationDosageSchema";
import {IApiResponse} from "../Types/ApiResponse";

const router = express.Router()

const JwtAuthenticate = passport.authenticate('jwt', {session: false});

let apiResponse:IApiResponse ={
    error: false,
    errorMessage: "",
    payload: undefined

}


router.put('/update',JwtAuthenticate,(req,res,next)=>{
    let timeMedicationWasTaken = req.body.timeTaken
    if(typeof timeMedicationWasTaken == typeof ""){
        timeMedicationWasTaken = new Date(timeMedicationWasTaken)
    }else{
        timeMedicationWasTaken = null
    }
    MedicationDosageModel.findOneAndUpdate({dosageId:req.body.dosageId},{hasBeenTaken:req.body.hasBeenTaken,hasBeenMissed:req.body.hasBeenMissed,timeTaken:timeMedicationWasTaken},(err:any,doc:any)=>{
        if(err){
            apiResponse.error = true
            apiResponse.errorMessage = err
            res.status(400).json(apiResponse)
        }else{
            res.status(200).json(apiResponse)
        }
    })
})

export default router