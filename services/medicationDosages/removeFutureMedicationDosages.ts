import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import {startOfToday} from "date-fns";


/**
 * removes future medicationDosages
 * @param req
 * @param medicationId
 */
const removeFutureMedicationDosages = (req, medicationId) => {
    MedicationDosageModel.find({
        timeToTake: {$gte: startOfToday()},
        userId: req.userId,
        medicationId: medicationId
    }, (err, arrayOfDosages) => {
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

export default removeFutureMedicationDosages;