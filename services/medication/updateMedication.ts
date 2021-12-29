import MedicationModel from "../../Schemas/MedicationSchema";




/**
 * Updates an existing medication and removes future medication dosages and creates new ones
 * @param req - the post req
 * @param res - the post res
 * @constructor
 */
const updateMedication = async (req:any, res:any) => {

    let updateModel = await MedicationModel.findOneAndUpdate({medicationId:req.body.medicationId}, req.body, {new: true})
    console.log(updateModel)
    if(updateModel){


    }

}


export default updateMedication;