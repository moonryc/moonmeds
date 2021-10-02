import React from 'react';


export interface IMedication {
    prescriptionName: string,
    prescriptionDosage: number,
    remainingDosages: number,
    nextFillDay: string,
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