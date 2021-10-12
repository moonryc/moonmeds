import {Document} from "mongoose";


/**
 * An object representing a medication object for creation in the backend
 * @property userId - type:string
 * @property _id - type:string
 */
export interface IMedicationSchema extends IMedication,Document{
    userId:string
    _id: string,

}


/**
 * (Backend) for creating and retriving doses associated with a user
 * @property userId - type:string
 * @property _id - type:string
 */
export interface IMedicationDosagesSchema extends IMedicationDosagesBase, Document{
    userId:string
    _id:string,
}

//TODO ADD WEEKDAYS
/**
 * On object representing a single medication
 * @property medication_id:string
 * @property hasBeenTaken:boolean,
 * @property isLateToTakeMedication
 * @property prescriptionName: stri
 * @property nextFillDay: Date,
 * @property amount: number,
 * @property time:Date,
 * @property isDaily:boolean,
 * @property isWeekly:boolean,
 * @property isMonthly:boolean,
 * @property selectedMonthly: Date,
 * @property isCustom:boolean,
 */
interface IMedicationDosagesBase extends IWeekdays{
    medication_id:string
    hasBeenTaken:boolean,
    isLateToTakeMedication:boolean
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


/**
 * This is an IMedication object with and _id
 * @property _id - type:string
 */
export interface IMedicationFrontEnd extends IMedication {
    _id: string,
}

/**
 * An object representing the base medication
 * @property prescriptionName: string,
 * @property prescriptionDosage: number,
 * @property startDay: Date,
 * @property nextFillDay: Date,
 * @property dosages: IDosagesDetails[],
 * @property userNotes: string,
 */
export interface IMedication {
    prescriptionName: string,
    prescriptionDosage: number,
    startDay: Date,
    nextFillDay: Date,
    dosages: IDosagesDetails[],
    userNotes: string,
}

/**
 * An object representing the dosage details for a single dose in a medication
 * @property amount: number,
 * @property time: Date,
 * @property isDaily: boolean,
 * @property isWeekly: boolean,
 * @property isMonthly: boolean,
 * @property selectedMonthly: Date,
 * @property isCustom: boolean,
 * @property customDays: ICustomDays
 */
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

//TODO
//Base custom days
export interface ICustomDays extends IWeekdays{
    startDate: Date,
    endDate: Date,
}

/**
 * An object representing which weekdays a medication should be taken
 @property monday: boolean,
 @property tuesday: boolean,
 @property wednesday: boolean,
 @property thursday: boolean,
 @property friday: boolean,
 @property saturday: boolean,
 @property sunday: boolean,
 */
interface IWeekdays {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
}