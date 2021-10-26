import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";


const getUserMedicationDosages = async (req:any) => {

    return await MedicationDosageModel.find({userId:req.user._id})

}

export default getUserMedicationDosages