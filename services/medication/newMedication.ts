import {Types} from "mongoose";
import MedicationModel from "../../Schemas/MedicationSchema";
import createDosages from "../medicationDosages/createDosages";

/**
 * creates a new medication if the medication is not a duplicate
 * @param req - the post request
 * @param res - then post response
 * @constructor
 */
const createNewMedication = async (req: any, res: any) => {
    //dont create a new medication if it is a duplicate
    await MedicationModel.exists({
        userId: req.user._id,
        prescriptionName: req.body.prescriptionName,
        prescriptionOwner: req.body.prescriptionOwner
    }, (err, doc) => {
        if (err) {
            throw err
        }
        if (doc) {
            throw "Medication already exists"
        } else {
            req.body.medicationId = new Types.ObjectId().toString()
            req.body.userId = req.user._id
            const newMedication = new MedicationModel(req.body)
            newMedication.save()
                .catch((error: any) => {
                    throw error
                })
            createDosages(req.body, true)
        }
    })

}


export default createNewMedication;