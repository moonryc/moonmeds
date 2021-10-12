/**
 * An object that represents a month
 * @property numberOfInMonthDays - type:number of days in a month
 * @property days - type:ICalendarDay[] an array of ICalendarDays
 */
export interface ICalendarMonth {
    numberOfInMonthDays: number
    days:ICalendarDay[]
}

/**
 * An object that represents a day
 * @property index - type:number
 * @property date - type:Date The date this Calender Day represents
 */
export interface ICalendarDay {
    index:number,
    date:Date,
    // medicationsTaken:IMedication[],
    // medicationsToTake:IMedication[],
    // missedMedications:IMedication[],
    // medicationToRefill:IMedication[],
}

