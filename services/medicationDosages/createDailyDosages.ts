import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";
import {isBefore} from "date-fns";
import * as mongoose from "mongoose"
//@ts-nocheck

/**
 * Creates dosages for tomorrow and optionally today
 * @param newDosage - medication dosage object
 * @param todayAndTomorrow - true if creating a new medicaiton or updating, otherwise false,
 * true to create a dosage for today and tomorrow, false will just create one for tomorrow
 * @param today - the time to take the medication with todays date
 * @param tomorrow - the time to the medication with tomorrows date
 * @constructor
 */
const createDailyDosages = (newDosage: IMedicationDosagesBase, todayAndTomorrow: boolean, today: Date, tomorrow: Date) => {


    const createDosagesForTomorrow = () => {
        if (newDosage.inDefinite) {
            newDosage.timeToTake = tomorrow
            newDosage.dosageId = new mongoose.Types.ObjectId().toString()
            let newDosageModel = new MedicationDosageModel({...newDosage})

            newDosageModel.save()
                .catch((error:any) => {
                    throw error;
                })

        } else {
            if (isBefore(tomorrow, newDosage.endDate)) {
                newDosage.timeToTake = tomorrow
                newDosage.dosageId = new mongoose.Types.ObjectId().toString()
                let newDosageModel = new MedicationDosageModel({...newDosage})
                newDosageModel.save()
                    .catch((error:any) => {
                        throw error;
                    })
            }
        }
    }

    if (todayAndTomorrow) {
        if (newDosage.inDefinite || isBefore(today, newDosage.endDate)) {
            newDosage.timeToTake = today
            newDosage.dosageId = new mongoose.Types.ObjectId().toString()
            let newDosageModel = new MedicationDosageModel({...newDosage})
            newDosageModel.save()
                .then((res:any) => createDosagesForTomorrow())
                .catch((error:any) => {
                    throw error
                })
        }

    } else {
        createDosagesForTomorrow()
    }


}


export default createDailyDosages