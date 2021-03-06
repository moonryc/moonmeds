//@ts-nocheck
import {ModelDefinition} from "./common";
import {IDosagesDetails, IMedicationBase, IWeekdays} from "../Types/MedicationTypes";

import {model, Schema} from "mongoose";
import * as mongoose from "mongoose";
import {IPersonNameAndColor} from "../Types/UserTypes";

const WeekdaysDefinition:ModelDefinition<IWeekdays>={

    monday: {type:Boolean,required:true},
    tuesday: {type:Boolean,required:true},
    wednesday: {type:Boolean,required:true},
    thursday: {type:Boolean,required:true},
    friday: {type:Boolean,required:true},
    saturday: {type:Boolean,required:true},
    sunday: {type:Boolean,required:true},

}

const DosagesDefinition:ModelDefinition<IDosagesDetails>={

    amount: {type:Number,required:true},
    amountDosageType: {type:String,required:true},
    time: {type:Date,required:true},
    isDaily: {type:Boolean,required:true},
    isWeekly: {type:Boolean,required:true},
    isOnceAMonth: {type:Boolean,required:true},
    customOnceAMonthDate: {type:Date,required:true},
    customWeekDays: {type: WeekdaysDefinition, required:true}
}


const PersonNameAndColorDefinition:ModelDefinition<IPersonNameAndColor> = {
    name:{type:String,required:true},
    color:{type:String,required:true},
    _id:{type:String,required:true},
}

const MedicationDefinition:ModelDefinition<IMedicationBase> = {
    userId: {type:String,required:true},
    medicationId: {type:String,required:true},
    inDefinite:{type:Boolean,required:true},
    endDate:{type:Date,required:true},
    prescriptionName: {type:String, required:true},
    medicationOwner: {type:PersonNameAndColorDefinition,required:true},
    prescriptionDosage: {type:Number, required:true},
    prescriptionDosageType: {type:String,required:true},
    nextFillDay: {type:Date, required:true},
    dosages: [{type: DosagesDefinition, required:true}],
    userNotes:{type:String, required:true},

}

// @ts-ignore
const MedicationSchema = new Schema(MedicationDefinition)

const MedicationModel = model<IMedicationBase & Document>(process.env.MEDICATION_MODEL_NAME, MedicationSchema);
export default MedicationModel;