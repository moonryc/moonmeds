import {Model, model, Schema} from "mongoose";
import {IMedicationDosagesSchema} from "../Types/MedicationType";
import {parseISO} from "date-fns"
import medication from "../routes/PrivateRoutes/medication";
import {MedicationModel} from "./medication";


export const medicationDosagesSchema: Schema = new Schema<IMedicationDosagesSchema>({
    userId: {type: String, required: true},
    _id: {type: String, required: true},
    medication_id: {type: String, required: true},
    hasBeenTaken: {type: Boolean, required: true},
    isLateToTakeMedication: {type: Boolean, required: true},
    medicationOwner:{type:String, required:true},
    prescriptionName: {type: String, required: true},
    nextFillDay: {type: Date, required: true},
    amount: {type: Number, required: true},
    time: {type: Date, required: true},
    isDaily: {type: Boolean, required: true},
    isWeekly: {type: Boolean, required: true},
    isMonthly: {type: Boolean, required: true},
    isCustom: {type: Boolean, required: true},
    selectedMonthly: {type: Date, required: false},
    monday: {type: Boolean, required: false},
    tuesday: {type: Boolean, required: false},
    wednesday: {type: Boolean, required: false},
    thursday: {type: Boolean, required: false},
    friday: {type: Boolean, required: false},
    saturday: {type: Boolean, required: false},
    sunday: {type: Boolean, required: false},
})

export const MedicationDosagesModel: Model<IMedicationDosagesSchema> = model('MedicationDosages', medicationDosagesSchema)


export const getUserMedicationsDosagesArray = async (userId: string) => {
    let medicationDosagesArray = MedicationDosagesModel.find({userId: userId})
    console.log(medicationDosagesArray)
    return medicationDosagesArray
}

export const removeFutureDosages = async (userId: string, medication_id: string) => {
    let dosagesArray = await MedicationDosagesModel.find({userId: userId, medication_id: medication_id});
    let currentTime = new Date()
    for (let index = 0; index < dosagesArray.length; index++) {
        if (dosagesArray[index].time > currentTime) {
            MedicationDosagesModel.findByIdAndDelete(dosagesArray[index]._id, {sort: false}, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("sucessful deletion")
                }
            })
        }
    }
}

export const updateMissedMedications = async () => {
    try {

        // await MedicationDosagesModel.updateMany({"hasBeenTaken":true}, {"$set":{"hasBeenTaken":false}},{"multi": true}, (err, writeResult) => {})

        let missedMedications: IMedicationDosagesSchema[] = await MedicationDosagesModel.find({hasBeenTaken: false, isLateToTakeMedication:false, time: {$lt: new Date()}})

        for (let index = 0; index < missedMedications.length; index++) {
            missedMedications[index].isLateToTakeMedication = true
            MedicationDosagesModel.findByIdAndUpdate(missedMedications[index]._id, missedMedications[index], {new: true}, (error, doc) => {
                if (error) {
                    return error
                }
            })
        }
        return "Successfully checked and updated missed medication dosages"
    } catch (error) {
        return error
    }


}


// module.exports = mongoose.model("medicationAlertsForUser",medicationTimeStampSchema)
