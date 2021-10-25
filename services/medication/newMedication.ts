import MedicationModel from "../../Schemas/MedicationSchema";
import * as mongoose from "mongoose";
import createDosages from "../medicationDosages/createDosages";


/**
 * creates a new medication if the medication is not a duplicate
 * @param req - the post request
 * @param res - then post response
 * @constructor
 */
const createNewMedication = (req, res) => {
    //dont create a new medication if it is a duplicate
    MedicationModel.exists({
        userId: req.user._id,
        prescriptionName: req.body.prescriptionName,
        prescriptionOwner: req.body.prescriptionOwner
    },(err,doc)=>{
        if(err){
            throw err
        }
        if(doc){
            throw "Medication already exists"
        }else{
            req.body.medicationId = new mongoose.Types.ObjectId()
            req.body.userId = req.user._id
            const newMedication = new MedicationModel(req.body)
            newMedication.save()
                .catch(error => {
                    throw error
                })
            createDosages(req.body, true)
        }
    })

}


export default createNewMedication;