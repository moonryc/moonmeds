import MedicationModel from "../../Schemas/MedicationSchema";
import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import createDosages from "../medicationDosages/createDosages";
import removeFutureMedicationDosages from "../medicationDosages/removeFutureMedicationDosages";


/**
 * Updates an existing medication and removes future medication dosages and creates new ones
 * @param req - the post req
 * @param res - the post res
 * @constructor
 */
const updateMedication = (req:any, res:any) => {

    MedicationModel.findOneAndUpdate(req.body.medicationId, req.body, {new: true}, (err, doc) => {
        if (err) {
            throw err
        } else {
            removeFutureMedicationDosages(req, req.body.medicationId)
            createDosages(req.body, true)
        }
    })


}


export default updateMedication;