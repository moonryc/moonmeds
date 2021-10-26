import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import {isBefore, isFriday, isMonday, isSaturday, isSunday, isThursday, isTuesday, isWednesday} from 'date-fns'
import * as mongoose from "mongoose"
import {Types} from "mongoose";

const createWeeklyDosages = (newDosage: IMedicationDosagesBase, todayAndTomorrow: boolean, today: Date, tomorrow: Date) => {
    let arrayOfDosages:any[] = []

    /**
     * if tomorrow is a valid day to take medication
     */
    const dayOfTheWeekChecker = (todayOrTomorrow: Date) => {


        if (isMonday(todayOrTomorrow) && newDosage.monday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
        if (isTuesday(todayOrTomorrow) && newDosage.tuesday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
        if (isWednesday(todayOrTomorrow) && newDosage.wednesday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
        if (isThursday(todayOrTomorrow) && newDosage.thursday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
        if (isFriday(todayOrTomorrow) && newDosage.friday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
        if (isSaturday(todayOrTomorrow) && newDosage.saturday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
        if (isSunday(todayOrTomorrow) && newDosage.sunday) {
            newDosage.timeToTake = todayOrTomorrow
            newDosage.dosageId = new Types.ObjectId().toString()
            arrayOfDosages.push({...newDosage})
        }
    }

    const createDosageForTomorrow = () => {
        if (newDosage.inDefinite) {
            dayOfTheWeekChecker(tomorrow)
        } else {
            if (isBefore(tomorrow, newDosage.endDate)) {
                dayOfTheWeekChecker(tomorrow)
            }

        }
    }


    if (todayAndTomorrow && (newDosage.inDefinite || isBefore(today, newDosage.endDate))) {
        dayOfTheWeekChecker(today)
        createDosageForTomorrow()
    } else {
        createDosageForTomorrow()
    }


    MedicationDosageModel.insertMany(arrayOfDosages).then(r => r)
}


export default createWeeklyDosages