import {Document} from "mongoose";

//(Backend) for creating an retriving medications associated with a user
export interface IMedicationSchema extends IMedication,Document{
    userId:string
    _id: string,

}

//(Backend) for creating and retriving doses associated with a user
export interface IMedicationDosagesSchema extends Document,IMedicationDosagesBase{
    userId:string
    _id:string,
    medication_id:string
    hasBeenTaken:boolean,
    isLateToTakenMedication:boolean

}

interface IMedicationDosagesBase extends IWeekdays{
    prescriptionName: string,
    nextFillDay: Date,
    amount: number,
    time:Date,
    isDaily:boolean,
    isWeekly:boolean,
    isMonthly:boolean,
    selectedMonthly: Date,
    isCustom:boolean,
}


// This is an interface to represent a medication object
export interface IMedicationFrontEnd extends IMedication {
    _id: string,
}

//Base medication object
export interface IMedication {
    prescriptionName: string,
    prescriptionDosage: number,
    startDay: Date,
    nextFillDay: Date,
    dosages: IDosagesDetails[],
    userNotes: string,
}

//Base Dosage object
export interface IDosagesDetails {
    amount: number,
    time: Date,
    isDaily: boolean,
    isWeekly: boolean,
    isMonthly: boolean,
    selectedMonthly: Date,
    isCustom: boolean,
    customDays: ICustomDays
}

//Base custom days
export interface ICustomDays extends IWeekdays{
    startDate: Date,
    endDate: Date,
}

interface IWeekdays {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
}