import { getHours, getMinutes, setHours, setMinutes, startOfToday, startOfTomorrow } from "date-fns";
import { Types } from "mongoose";
import { IMedicationDosagesBase } from "../../Types/MedicationDosagesTypes";
import { IMedicationBase } from "../../Types/MedicationTypes";
import CreateDailyDosages from "./CreateDailyDosages";
import CreateMonthlyDosages from "./CreateMonthlyDosages";
import CreateWeeklyDosages from "./CreateWeeklyDosages";

/**
 * Creates medication dosages for the medication that is passed
 * provided a new medication dosage is required today or tomorrow
 * @param medication - a medication object
 * @param todayAndTomorrow - true if updating or creating a new medication, false otherwise
 * @constructor
 */
const createDosages = (medication: IMedicationBase, todayAndTomorrow: boolean) => {

    //loop through the dosages
    for (let dose of medication.dosages) {

        const { customWeekDays, time, ...rest } = dose;

        //creates a new dosage object
        let newDosage: IMedicationDosagesBase = {
            ...rest,
            ...medication,
            ...customWeekDays,

            timeToTake: time,

            //create
            dosageId: new Types.ObjectId().toString(),

            //When created this should always be false/undefined
            timeTaken: undefined,
            hasBeenMissed: false,
            hasBeenTaken: false,
        }

        //gets tomorrows date and sets the time to that of which the medication should be taken
        //region tomorrow
        let tomorrow = startOfTomorrow()
        let hour = getHours(newDosage.timeToTake)
        let minute = getMinutes(newDosage.timeToTake)

        tomorrow = setHours(tomorrow, hour)
        tomorrow = setMinutes(tomorrow, minute)
        //endregion

        //gets todays date and sets the time to that of which the medication should be taken
        //region today
        let today = startOfToday()
        let todayHour = getHours(newDosage.timeToTake)
        let todayMin = getMinutes(newDosage.timeToTake)

        today = setHours(today, todayHour)
        today = setMinutes(today, todayMin)
        //endregion


        if (newDosage.isDaily) {
            CreateDailyDosages(newDosage, todayAndTomorrow, today, tomorrow)
        }
        else if (newDosage.isWeekly) {
            CreateWeeklyDosages(newDosage, todayAndTomorrow, today, tomorrow)
        }
        else if (newDosage.isOnceAMonth) {
            CreateMonthlyDosages(newDosage, todayAndTomorrow, today, tomorrow)
        }
        else {
            console.log("error")
        }
    }
}

export default createDosages;