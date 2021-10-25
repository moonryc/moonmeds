import cron = require('node-cron');
import MedicationModel from "../../Schemas/MedicationSchema";
import createDosages from "../../services/medicationDosages/createDosages";


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
cron.schedule('0 19 * * *', async () => {

    MedicationModel.find({$or:[{inDefinite:true},{endDate:{$gt:new Date()}}]},(err,arrayOfMedications)=>{
        if(err){
            console.log(err)
        }else{
            //loop through all medications
            for(let medication of arrayOfMedications){
                createDosages(medication,false)
            }
        }
    })

    console.log(`created dosages for tomorrow at ${new Date()}`)

})