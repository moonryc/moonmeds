import MedicationModel from "../../Schemas/MedicationSchema";


const getUserMedications = (req) => {
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