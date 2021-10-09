

export interface ICalendarMonth {
    numberOfInMonthDays: number
    days:ICalendarDay[]
}

export interface ICalendarDay {
    index:number,
    date:Date,
    // medicationsTaken:IMedication[],
    // medicationsToTake:IMedication[],
    // missedMedications:IMedication[],
    // medicationToRefill:IMedication[],
}

export interface IRenderedOnHomePage{
    isRenderedOnHomePage:boolean
}

