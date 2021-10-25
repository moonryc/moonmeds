import cron = require('node-cron');
import MedicationDosageModel from "../../Schemas/MedicationDosageSchema";

/**
 *  # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 */

/**
 * checks for missed medications every minute
 * @constructor
 */
cron.schedule('* 0 * * *', async () => {

    let missedMedications = await MedicationDosageModel.find({
        hasBeenTaken: false,
        hasBeenMissed: false,
        timeToTake: {$lt: new Date()}
    })

    for (let index = 0; index < missedMedications.length; index++) {
        missedMedications[index].hasBeenMissed = true
        MedicationDosageModel.findByIdAndUpdate(missedMedications[index]._id, missedMedications[index], {new: true}, (error, doc) => {
            if (error) {
                return error
            }
        })
    }
})




