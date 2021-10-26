import {IMedicationBase} from "../../Types/MedicationTypes";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import * as mongoose from "mongoose"
import CreateWeeklyDosages from "./CreateWeeklyDosages";
import CreateMonthlyDosages from "./CreateMonthlyDosages";
import CreateDailyDosages from "./CreateDailyDosages";
import {getHours, getMinutes, setHours, setMinutes, startOfToday, startOfTomorrow} from "date-fns";

/**
 * Creates medication dosages for the medication that is passed
 * provided a new medication dosage is required today or tomorrow
 * @param medication - a medication object
 * @param todayAndTomorrow - true if updating or creating a new medication, false otherwise
 * @constructor
 */
const createDosages = (medication:IMedicationBase,todayAndTomorrow:boolean) => {

    //loop through the dosages
    for(let dose of medication.dosages){

        //creates a new dosage object
        let newDosage:IMedicationDosagesBase = {
            userId: medication.userId,
            medicationId: medication.medicationId,
            prescriptionName: medication.prescriptionName,
            medicationOwner: medication.medicationOwner,
            nextFillDay: medication.nextFillDay,
            inDefinite: medication.inDefinite,
            endDate: medication.endDate,
            amount: dose.amount,
            timeToTake: dose.time,
            isDaily: dose.isDaily,
            isWeekly: dose.isWeekly,
            isOnceAMonth: dose.isOnceAMonth,
            customOnceAMonthDate: dose.customOnceAMonthDate,
            monday: dose.customWeekDays.monday,
            tuesday: dose.customWeekDays.tuesday,
            wednesday: dose.customWeekDays.wednesday,
            thursday: dose.customWeekDays.thursday,
            friday: dose.customWeekDays.friday,
            saturday: dose.customWeekDays.saturday,
            sunday: dose.customWeekDays.sunday,

            //create
            dosageId: new mongoose.Types.ObjectId().toString(),

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


        if(newDosage.isDaily){
            CreateDailyDosages(newDosage,todayAndTomorrow,today,tomorrow)
        }
        else if(newDosage.isWeekly){
            CreateWeeklyDosages(newDosage,todayAndTomorrow,today,tomorrow)
        }
        else if(newDosage.isOnceAMonth){
            CreateMonthlyDosages(newDosage,todayAndTomorrow,today,tomorrow)
        }
        else{
            console.log("error")
        }
    }
}

export default createDosages;