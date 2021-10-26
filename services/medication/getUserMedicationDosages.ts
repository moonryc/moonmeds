import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";


const getUserMedicationDosages = (req:any):any => {
    let medicationDosagesArray;
    MedicationDosageModel.find({userId:req.user._Id},(err,doc)=>{
        if(err){
            throw err
        }else{
            medicationDosagesArray = [...doc]
        }
    })
    return medicationDosagesArray
}

export default getUserMedicationDosages