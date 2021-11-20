//@ts-nocheck
require('dotenv').config()
console.log('dotenv loaded')

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
app.disable('etag')
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

// //TODO remeber what this does
if (process.env.Node_ENV !== "DEV") {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        next();
    });
}
//     app.options('*', (req, res, next) => {
//         res.json({
//             status: 'OK'
//         });
//         next()
//     });
// }


//region Security
// /* Set Security Configs */
// app.use(helmet());
// app.use(hpp());
// app.use(csurf({cookie:true}));
//endregion

// cors to allow cross origin resource sharing
const whitelist = [undefined, 'http://localhost:3000', 'http://localhost:3001/', "https://moonmeds.herokuapp.com"]
const corsOptions = {
    credentials: true,
    origin: function (origin: any, callback: any) {
        console.log("-------------")
        console.log("origin")
        console.log(origin)
        console.log("-------------")
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

//endregion

app.use('/', indexRouter)

//region Host the React Build

if (process.env.NODE_ENV != "DEV") {
// Pick up React index.html file
    app.use(
        express.static(path.join(__dirname, "/frontend/build"))
    );

    app.get("*", (req, res) => {
        res.set("Content-Security-Policy", "default-src *; style-src 'self' https://* 'unsafe-inline'; script-src 'self' https://* 'unsafe-inline' 'unsafe-eval'")
            .sendFile(
                path.join(__dirname, "/frontend/build/index.html")
            );
    })

}
//endregion

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
    console.log(err)
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// //endregion

//endregion

const port = process.env.PORT || 3001
app.listen(port, () => console.log("Server listening on port", port))

module.exports = app;
