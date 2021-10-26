import MedicationModel from "../../Schemas/MedicationSchema";
import removeFutureMedicationDosages from "../medicationDosages/removeFutureMedicationDosages";
import removeAllMedicationDosages from "../medicationDosages/removeAllMedicationDosages";

/**
 * Removes medications from an array of medicationId's and removes the future dosages or past dosages based on what the users wishes
 * @param req
 * @param res
 * @constructor
 */
const removeMedications = (req:any, res:any) => {
    for (let medicationId of req.body.arrayOfMedicationIds) {
        MedicationModel.findOneAndDelete({medicationId: medicationId}, {sort: false}, (err, doc) => {
            if (err) {
                throw err
            } else {
                if (req.body.removePastMedicationDosages) {
                    removeAllMedicationDosages(req, medicationId)
                } else {
                    removeFutureMedicationDosages(req, medicationId)
                }
            }
        })



    }

}








export default removeMedications