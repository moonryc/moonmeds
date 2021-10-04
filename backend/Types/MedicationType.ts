import {Document} from "mongoose";

//(Backend) for creating an retriving medications associated with a user
export interface IMedicationSchema extends IMedication,Document{
    userId:string
    _id: string,

}

// This is an interface to represent a medication object
export interface IMedicationFrontEnd extends IMedication {
    _id: string,
}

//Base medication object
export interface IMedication {
    prescriptionName: string,
    prescriptionDosage: number,
    remainingDosages: number,
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
    isCustom: boolean,
    customDays: ICustomDays
}

//Base custom days
export interface ICustomDays {
    startDate: Date,
    endDate: Date,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
}