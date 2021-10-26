//region Development

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    console.log('dotenv loaded')
}
//endregion

//region Imports
import express = require('express');
import passport = require("passport")
import createError = require('http-errors');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import cors = require('cors');
import indexRouter from "./routes";
//endregion

const app = express();

//region View handler setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//endregion

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//TODO UNDERSTAND
// import helmet = require('helmet');
// import hpp = require('hpp');
// import csurf = require('csurf');

//region middleware

require('./Schemas/UserSchema')
require('./Schemas/MedicationSchema')
require('./Schemas/MedicationDosageSchema')


require("./middleware/database")
require("./middleware/requestLimiter")
require('./middleware/timedMiddleware/markMissedMedications')
require('./middleware/timedMiddleware/createDosageEveryTwentyFourHours')
require('./middleware/passport')
//Passport
app.use(passport.initialize());
app.use(cors())

//TODO remeber what this does
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     next();
// });
// app.options('*', (req, res,next) => {
//     res.json({
//         status: 'OK'
//     });
//     next()
// });


//region Security
// /* Set Security Configs */
// app.use(helmet());
// app.use(hpp());
// app.use(csurf({cookie:true}));
//endregion

//#region app.use(cors)
//cors to allow cross origin resource sharing
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true,
//     }));
//#endregion

//region routes
app.use('/',indexRouter)

//endregion


//endregion

//region Host the React Build

if (process.env.NODE_ENV != "development") {
// Pick up React index.html file
    app.use(
        express.static(path.join(__dirname, "/build"))
    );

    app.get("*", (req, res) => {
        res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
            .sendFile(
                path.join(__dirname, "/build/index.html")
            );
    })

}
//endregion


//region Views

//region 404 Catcher
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req)
    next(createError(404));
});
//endregion

//region ERROR HANDLER
// error handler
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// //endregion

//endregion

const port = 3001
app.listen(port, () => console.log("Server listening on port", port))

module.exports = app;
