import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";


const getUserMedicationDosages = (req) => {
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