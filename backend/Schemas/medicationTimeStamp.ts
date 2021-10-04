const mongoose = require('mongoose');
const {Schema} = mongoose;

const medicationTimeStampSchema = new Schema({
    userId:String,
    medicationName:String,
    dosages:[],
    medicationDays: {
        everyMonday: Boolean,
        monday: Boolean,
        everyTuesday: Boolean,
        tuesday: Boolean,
        everyWednesday: Boolean,
        wednesday: Boolean,
        everyThursday: Boolean,
        thursday: Boolean,
        everyFriday: Boolean,
        friday: Boolean,
        everySaturday: Boolean,
        saturday: Boolean,
        everySunday: Boolean,
        sunday: Boolean,
    }

    //Time of Dosage
})

module.exports = mongoose.model("medicationAlertsForUser",medicationTimeStampSchema)