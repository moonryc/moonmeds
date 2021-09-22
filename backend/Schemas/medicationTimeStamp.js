const mongoose = require('mongoose');
const {Schema} = mongoose;

const medicationTimeStampSchema = new Schema({
    email:String,
    medicationName:String,
    //Time of Dosage
})

module.exports = mongoose.model("medicationAlertsForUser",medicationTimeStampSchema)