import MedicationModel from "../../Schemas/MedicationSchema";


const getUserMedications = async (req:any) => {

    return await MedicationModel.find({userId:req.user._id})

}

export default getUserMedications