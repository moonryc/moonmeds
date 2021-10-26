import {differenceInCalendarDays, isBefore} from "date-fns";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import * as mongoose from "mongoose"
//@ts-nocheck

/**
 * Creates a medication dosage based on  the dosage input and depending
 * on preference will create one only for tomorrow or for both today and tomorrow
 * @param newDosage
 * @param todayAndTomorrow - true if desired to create a medication dosage for both today and tomorrow false
 * to just create a dosage for tomorrow
 * @param today - the Date/time to take the medication with todays date
 * @param tomorrow - the Date/time to take the medication with tomorrows date
 * @constructor
 */
const createMonthlyDosages = (newDosage: IMedicationDosagesBase, todayAndTomorrow: boolean, today: Date, tomorrow: Date) => {

    /**
     * is the date 30 days from the start date for taking the monthly medication
     * @param todayOrTomorrow
     * @return boolean
     */
    const isDayThirtyDayMark = (todayOrTomorrow: Date):boolean => {
        if (differenceInCalendarDays(newDosage.customOnceAMonthDate, todayOrTomorrow) % 30 === 0) {
            return true;
        } else {
            return false
        }
    }

    /**
     * creates tomorrows dosage if there is a valid dose to be taken tomorrow
     */
    const createDosagesTomorrow = () => {
        if (isDayThirtyDayMark(tomorrow) && (newDosage.inDefinite || isBefore(tomorrow, newDosage.endDate))) {
            newDosage.timeToTake = tomorrow
            newDosage.dosageId = new mongoose.Types.ObjectId().toString()
            let newDosageModel = new MedicationDosageModel({...newDosage})
            newDosageModel.save().then((res:any)=>res)
        }
    }

    if (todayAndTomorrow && isDayThirtyDayMark(today) && (newDosage.inDefinite || isBefore(today, newDosage.endDate))) {
        newDosage.timeToTake = today
        newDosage.dosageId = new mongoose.Types.ObjectId().toString()
        let newDosageModel = new MedicationDosageModel({...newDosage})
        newDosageModel.save()
            .then((res:any)=>createDosagesTomorrow())
    } else {
        createDosagesTomorrow()
    }


}


export default createMonthlyDosages