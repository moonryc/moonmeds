//@ts-nocheck
import {ModelDefinition} from "./common";
import {IDosagesDetails, IMedicationBase, IWeekdays} from "../Types/MedicationTypes";

import {model, Schema} from "mongoose";
import * as mongoose from "mongoose";

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
    time: {type:Date,required:true},
    isDaily: {type:Boolean,required:true},
    isWeekly: {type:Boolean,required:true},
    isOnceAMonth: {type:Boolean,required:true},
    customOnceAMonthDate: {type:Date,required:true},
    customWeekDays: {type: WeekdaysDefinition, required:true}
}


const MedicationDefinition:ModelDefinition<IMedicationBase> = {
    userId: {type:String,required:true},
    medicationId: {type:String,required:true},
    inDefinite:{type:Boolean,required:true},
    endDate:{type:Date,required:true},
    prescriptionName: {type:String, required:true},
    medicationOwner: {type:String, required:true},
    prescriptionDosage: {type:Number, required:true},
    nextFillDay: {type:Date, required:true},
    dosages: [{type: DosagesDefinition, required:true}],
    userNotes:{type:String, required:true},

}

// @ts-ignore
const MedicationSchema = new Schema(MedicationDefinition)

const MedicationModel = model<IMedicationBase & mongoose.Document>('MedicationTest', MedicationSchema);
export default MedicationModel;