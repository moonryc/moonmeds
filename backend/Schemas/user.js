const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    email:String,
    password:String,
})

module.exports = mongoose.model("users",userSchema)