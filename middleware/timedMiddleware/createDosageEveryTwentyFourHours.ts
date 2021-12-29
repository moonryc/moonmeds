import cron = require('node-cron');
import MedicationModel from "../../Schemas/MedicationSchema";
import UserModel from "../../Schemas/UserSchema";
import {createTomorrowsDosages} from "../../services/dosages/createTomorrowsDosages";



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

    UserModel.find((error,doc)=>{
        if(error){
            console.log(error)
        }else{

            for(let user of doc){
                createTomorrowsDosages(user._id)
            }
        }
    })

    console.log(`created dosages for tomorrow at ${new Date()}`)

})