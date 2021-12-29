import express =require('express')
import passport =require("passport");
import MedicationDosageModel from "../Schemas/MedicationDosageSchema";
import {IApiResponse} from "../Types/ApiResponse";
import DosageModel from "../Schemas/DosagesSchema";

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

router.put('/medicationDosageDateRange', JwtAuthenticate, async (req:any,res,next)=>{

    console.log(req.user._id)
    console.log(req.body.startDate)
    console.log(req.body.endDate)
    DosageModel.find({ date:{$gte:new Date(req.body.startDate), $lte:new Date(req.body.endDate)}, userId:req.user._id},(err,doc)=>{
        if(err){
            apiResponse.error = true
            apiResponse.errorMessage = "damn something went wrong getting the data"
            res.status(400).json(apiResponse)
        }else{
            console.log(doc)
            apiResponse.payload = doc
            res.status(200).json(apiResponse)
        }
    })
})

export default router