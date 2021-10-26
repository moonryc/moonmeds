const mongoose = require("mongoose");

let url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.pdwgv.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const connection = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const collections = Object.keys(mongoose.connection.collections);
const db = mongoose.connection;

mongoose.connection.on('connected',()=>{
    console.log("Database connected")
    console.log("--------------------------")
    console.log("Collections")
    console.log(collections);
    console.log("--------------------------")
})

