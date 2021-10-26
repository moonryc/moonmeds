import MedicationModel from "../../Schemas/MedicationSchema";
import {IMedicationBase} from "../../Types/MedicationTypes";


const getUserMedications = (req:any):any => {
    let medicationUserArray;
    MedicationModel.find({userId:req.user._id},(err,doc)=>{
        if(err){
            throw err
        }else{
            medicationUserArray = [...doc]
        }
    })
    return medicationUserArray
}

export default getUserMedications