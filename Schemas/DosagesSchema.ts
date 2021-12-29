//@ts-nocheck
import {ModelDefinition} from "./common";
import {IDosages, IMedicationDosagesBase} from "../Types/MedicationDosagesTypes";
import {model, Schema} from "mongoose";
import {IPersonNameAndColor} from "../Types/UserTypes";

const PersonNameAndColorDefinition:ModelDefinition<IPersonNameAndColor> = {
    name:{type:String,required:true},
    color:{type:String,required:true},
}

const MedicationDosageDefinition:ModelDefinition<IMedicationDosagesBase> = {
    userId:{type:String,required:true},
    medicationId:{type:String,required:true},
    dosageId:{type:String,required:true},
    prescriptionName: {type:String,required:true},
    nextFillDay: {type:Date,required:true},
    endDate:{type:Date,required:true},
    amount: {type:Number, required:true},
    medicationOwner: {type:PersonNameAndColorDefinition,required:true},
    inDefinite:{type:Boolean,required:true},
    timeToTake:{type:Date,required:true},
    isDaily:{type:Boolean,required:true},
    isWeekly:{type:Boolean,required:true},
    isOnceAMonth:{type:Boolean,required:true},
    customOnceAMonthDate: {type:Date,required:true},
    hasBeenTaken:{type:Boolean,required:true},
    hasBeenMissed:{type:Boolean,required:true},
    //@ts-ignore
    timeTaken:{type:Schema.Types.Mixed,required:false}, //should be null or a date, null if it has not been taken, date if it has
    monday: {type:Boolean,required:true},
    tuesday: {type:Boolean,required:true},
    wednesday: {type:Boolean,required:true},
    thursday: {type:Boolean,required:true},
    friday: {type:Boolean,required:true},
    saturday: {type:Boolean,required:true},
    sunday: {type:Boolean,required:true},
}

const DosageDefinition:ModelDefinition<IDosages> = {
    userId:{type:String,required:true},
    date:{type:Date,required:true},
    dosages:[{type:MedicationDosageDefinition,required:true}]
}

// @ts-ignore
const DosageSchema = new Schema(DosageDefinition);

const DosageModel = model<IDosages & Document>(process.env.DOSAGES_MODEL_NAME,DosageSchema)

export default  DosageModel;