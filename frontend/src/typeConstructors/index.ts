import {IDosagesDetails, IMedicationBase} from "../../../Types/MedicationTypes";
import {IPersonNameAndColor} from "../../../Types/UserTypes";


export const makeMedication = () => ({
    medicationId: "",
    userId: "",
    prescriptionName: "",
    medicationOwner: { name: "Default", color: "secondary", _id:"1" },
    prescriptionDosage: 0,
    prescriptionDosageType: "Milligram",
    nextFillDay: new Date(),
    inDefinite: true,
    endDate: new Date(),
    userNotes: "",
    dosages: [
        {
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
        },
    ],
} as IMedicationBase)

export const makePersonNameAndColor = ()=>({
    name: "Default",
    color: "secondary",
    _id:"1"
} as IPersonNameAndColor)

export const makeDosageDetails = () => ({
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