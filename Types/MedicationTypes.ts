/**
 * An object representing the base medication
 * @property medicationId - string
 * @property prescriptionName: string,
 * @property prescriptionDosage: number,
 * @property nextFillDay: Date,
 * @property dosages: IDosagesDetails[],
 * @property userNotes: string,
 */
import {IPersonNameAndColor} from "./UserTypes";

export interface IMedicationBase {
    userId:string
    inDefinite:boolean
    medicationId:string
    prescriptionName: string,
    medicationOwner:IPersonNameAndColor,
    prescriptionDosage: number,
    nextFillDay: Date,
    endDate:Date,
    dosages: IDosagesDetails[],
    userNotes: string,
}


/**
 * An object representing the dosage details for a single dose in a medication
 @property amount: number,
 @property time: Date,
 @property isDaily: boolean,
 @property isWeekly: boolean,
 @property isOnceAMonth: boolean,
 @property customOnceAMonthDate: Date,
 @property customWeekDays: IWeekdays
 */
export interface IDosagesDetails {
    amount:number,
    time: Date,
    isDaily: boolean,
    isWeekly: boolean,
    isOnceAMonth: boolean,
    customOnceAMonthDate: Date,
    customWeekDays: IWeekdays

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
export interface IWeekdays {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
}


export interface IRemoveMedications {
    removePastMedicationDosages: boolean,
    arrayOfMedicationIds: string[],
}