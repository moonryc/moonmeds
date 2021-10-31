import { IMedicationBase } from "../../../Types/MedicationTypes";

export const makeMedication = () => ({
    medicationId: "",
    userId: "",
    prescriptionName: "",
    medicationOwner: { name: "", color: "" },
    prescriptionDosage: 0,
    nextFillDay: new Date(),
    inDefinite: true,
    endDate: new Date(),
    userNotes: "",
    dosages: [
        {
            amount: 0,
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