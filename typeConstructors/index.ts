import {IDosagesDetails, IMedicationBase} from "../Types/MedicationTypes";
import {IPersonNameAndColor} from "../Types/UserTypes";
import {Types} from "mongoose";

export const makeMedication = () => ({
    medicationId: "",
    userId: "",
    prescriptionName: "",
    medicationOwner: makePersonNameAndColor(),
    prescriptionDosage: 0,
    prescriptionDosageType: "Milligram",
    nextFillDay: new Date(),
    inDefinite: true,
    endDate: new Date(),
    userNotes: " ",
    dosages: [makeDosageDetails()],
} as IMedicationBase)

export const makePersonNameAndColor = () => ({
    name: "",
    color: "secondary",
    _id: "1"
} as IPersonNameAndColor)

export const makeDosageDetails = () => ({
    dosageIdentifier: new Types.ObjectId().toString(),
    amount: 0,
    amountDosageType: "Milligram",
    time: new Date(),
    isDaily: true,
    isWeekly: false,
    isOnceAMonth: false,
    customOnceAMonthDate: new Date(),
    customWeekDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    },
} as IDosagesDetails)