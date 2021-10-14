//region Development



import {updateMissedMedications} from "./Schemas/medicationDosages";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    console.log('dotenv loaded')
}
//endregion

//region Imports

import express = require('express');
import createError = require('http-errors');
import path = require('path');
import cookieParser =require('cookie-parser');
import logger = require('morgan');
import authRouter from './routes/auth';
import medicationRouter from "./routes/PrivateRoutes/medication";
import personsRouter from "./routes/PrivateRoutes/persons";

//endregion

const app = express();

//region View handler setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//endregion

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//region Middleware

//region Middleware imports
//TODO MONGOOSE TO IMPORT
const mongoose = require("mongoose");
import session = require('cookie-session');
import helmet = require('helmet');
import hpp = require('hpp');
// import csurf = require('csurf');
import {schedule} from "node-cron"
import passport from "./passport/setup";
import rateLimit = require('express-rate-limit');
//endregion

//region Mongoose
let url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.pdwgv.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const connection = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const collections = Object.keys(mongoose.connection.collections);
console.log(collections);

const db = mongoose.connection;

//endregion

//region update missed medications

//runs task every minute
schedule('* * * * *', async ()=>{
    console.log("Running scheduled task")
    let updateResponse = await updateMissedMedications()
    if(typeof updateResponse  != typeof ""){
        updateResponse = JSON.stringify(updateResponse)
        console.log(updateResponse)
    }else{
        console.log(updateResponse)
    }

});

//endregion

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://www.domainA.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});
app.options('*', (req, res) => {
    res.json({
        status: 'OK'
    });
});

//region cookie
/* Set Cookie Settings */
app.use(
    session({
        name: 'MoonMedsCookie',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
);
//endregion

//region Security
/* Set Security Configs */
app.use(helmet());
app.use(hpp());
// app.use(csurf({cookie:true}));
//endregion

//Passport
app.use(passport.initialize());

//#region app.use(cors)
//cors to allow cross origin resource sharing
import cors = require('cors');

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
//#endregion

//TODO UNDERSTAND
// region limiter
/* Rate Limiter */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);
//endregion

//endregion

//region routes
app.use('/medication', medicationRouter);
app.use('/persons', personsRouter);
app.use('/auth', authRouter);
//endregion

//region Views

//region 404 Catcher
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
//endregion

//region ERROR HANDLER
// error handler
app.use(function (err:any, req:any, res:any, next:any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//endregion

//endregion

const port = 3001
app.listen(port, () => console.log("Server listening on port", port))

module.exports = app;

