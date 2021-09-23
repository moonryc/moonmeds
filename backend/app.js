//region Development

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
  console.log('dotenv loaded')
}
//endregion

//region Imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const medicationRouter = require('./routes/medications');
//endregion

const app = express();

//region View handler setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//endregion

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//region Middleware

//region Middleware imports
const mongoose = require("mongoose");
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const passport = require('./passport/setup');
const rateLimit = require('express-rate-limit');
//endregion

//region Mongoose
let url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.pdwgv.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const connection = mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
const collections = Object.keys(mongoose.connection.collections);
console.log(collections);

const db = mongoose.connection;

//endregion

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
app.use(csurf());
//endregion

// //TODO UNDERSTAND
// // region limiter
// /* Rate Limiter */
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
// });
// app.use(limiter);
// //endregion


//Passport
app.use(passport.initialize());

//#region app.use(cors)
//cors to allow cross origin resource sharing
const cors = require('cors')
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));
//#endregion

//endregion

//region routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/medication', medicationRouter);
app.use('/auth', authRouter);
//endregion

//region Views

//region 404 Catcher
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//endregion

//region ERROR HANDLER
// error handler
app.use(function(err, req, res, next) {
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
app.listen(port, ()=> console.log("Server listening on port", port))

module.exports = app;

