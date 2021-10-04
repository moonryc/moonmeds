import {Model, model, Schema} from "mongoose";
import {IMedicationDosagesSchema, IMedicationSchema} from "../Types/MedicationType";


export const medicationDosagesSchema:Schema = new Schema<IMedicationDosagesSchema>({
    userId:{type:String,required:true},
    _id:{type:String,required:true},
    medication_id:{type:String,required:true},
    hasBeenTaken:{type:Boolean,required:true},
    isLateToTakenMedication:{type:Boolean,required:true},
    prescriptionName: {type:String,required:true},
    nextFillDay: {type:Date,required:true},
    amount: {type:Number,required:true},
    time:{type:Date,required:true},
    isDaily:{type:Boolean,required:true},
    isWeekly:{type:Boolean,required:true},
    isMonthly:{type:Boolean,required:true},
    selectedMonthly: {type:Date,required:true},
    isCustom:{type:Boolean,required:true},
    monday: {type:Boolean,required:true},
    tuesday: {type:Boolean,required:true},
    wednesday: {type:Boolean,required:true},
    thursday: {type:Boolean,required:true},
    friday: {type:Boolean,required:true},
    saturday: {type:Boolean,required:true},
    sunday: {type:Boolean,required:true},
})

export const MedicationDosagesModel:Model<IMedicationDosagesSchema> = model('MedicationDosages',medicationDosagesSchema)


export const getUserMedicationsDosagesArray = async (userId:string) => {
    let medicationDosagesArray = MedicationDosagesModel.find({userId: userId})
    return medicationDosagesArray
}



// module.exports = mongoose.model("medicationAlertsForUser",medicationTimeStampSchema)
