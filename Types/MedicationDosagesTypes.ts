import {IWeekdays} from "./MedicationTypes";
import {IPersonNameAndColor} from "./UserTypes";

/**
 * An object representing a single medication
 * @property medication_id:string
 * @property hasBeenTaken:boolean,
 * @property prescriptionName: string
 * @property nextFillDay: Date,
 * @property amount: number,
 * @property time:Date,
 * @property isDaily:boolean,
 * @property isWeekly:boolean,
 * @property isMonthly:boolean,
 * @property selectedMonthly: Date,
 * @property isCustom:boolean,
 */
export interface IMedicationDosagesBase extends IWeekdays {
    userId:string
    medicationId: string,
    dosageId: string,
    prescriptionName: string,
    nextFillDay: Date,
    endDate: Date,
    inDefinite: boolean,
    amount: number,
    medicationOwner: IPersonNameAndColor,
    timeToTake: Date,
    isDaily: boolean,
    isWeekly: boolean,
    isOnceAMonth: boolean,
    customOnceAMonthDate: Date,
    hasBeenTaken: boolean,
    hasBeenMissed: boolean,
    timeTaken: any | Date | null //should be null or a date, null if it has not been taken,
    // date if it has (have to use any to get around a typescript error)
}

export interface IUpdateDosage {
    dosageId:string
    hasBeenTaken: boolean
    hasBeenMissed: boolean
    timeTaken: Date|null
}

export interface IDosages {
    userId:string,
    date:Date,
    dosages:IMedicationDosagesBase[]
}