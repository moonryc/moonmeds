const mongoose = require('mongoose');
const {Schema} = mongoose;

const medicationSchema = new Schema({
    userId: String,
    medicationName: String,
    dosage: Number,
    remainingDosages: Number,
    nextFillDate: Date,
    userNotes: String, //place time of days that the medication should be taken
    doses: [],
})

module.exports = mongoose.model("medicationsForUser", medicationSchema)