
//this is for the backend to define the schema
export interface IMedicationSchema extends IMedication{
    userId:string
}

//This is for the backend return value
export interface IMedicationList {
    error: boolean,
    medicationList: IMedicationSchema[]
}

export interface IMedication {
    _id: string,
    prescriptionName: string,
    prescriptionDosage: number,
    remainingDosages: number,
    nextFillDay: Date,
    dosages: IDosagesDetails[],
    userNotes: string,
}

export interface IDosagesDetails {
    amount: number,
    time: Date,
    isDaily: boolean,
    isWeekly: boolean,
    isMonthly: boolean,
    isCustom: boolean,
    customDays: ICustomDays
}

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