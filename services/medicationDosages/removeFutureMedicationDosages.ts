//@ts-nocheck
import { startOfToday } from "date-fns";
import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";


/**
 * removes future medicationDosages
 * @param req
 * @param medicationId
 */
const removeFutureMedicationDosages = async (req: any, medicationId: any) => {
    MedicationDosageModel.find({
        timeToTake: { $gte: startOfToday() },
        medicationId: medicationId
    }, (err, arrayOfDosages) => {
        for (let dosage of arrayOfDosages) {
            MedicationDosageModel.findByIdAndDelete(dosage._id, { sort: false }, (err) => {
                if (err) {
                    throw err
                } else {
                    //TODO: use a logger
                    console.log("successful deletion")
                }
            })
        }
    })
}

export default removeFutureMedicationDosages;