const mongoose = require('mongoose');
const {Schema} = mongoose;

const medicationSchema = new Schema({
    email: String,
    medicationName: String,
    dosage:Number,
    remainingDosages: Number,
    nextFillDate: Date,
    timeStamps:[] //place time of days that the medication should be taken
})

module.exports = mongoose.model("medicationsForUser",medicationSchema)