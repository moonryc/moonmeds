import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";

/**
 * removes all medicationDosages
 * @param req
 * @param medicationId
 */
const removeAllMedicationDosages = (req:any, medicationId:string) => {
    MedicationDosageModel.find({userId: req.userId, medicationId: medicationId},(err,arrayOfDosages)=>{
        for (let dosage of arrayOfDosages) {
            MedicationDosageModel.findByIdAndDelete(dosage._id, {sort: false}, (err) => {
                if (err) {
                    throw err
                } else {
                    console.log("successful deletion")
                }
            })

        }
    })


}

export default removeAllMedicationDosages