//region Development

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
  console.log('dotenv loaded')
}
//endregion

//region Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var medicationRouter = require('./routes/medications');

//endregion

var app = express();

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
const mongoose = require("mongoose");

//region Mongoose
let url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.pdwgv.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
console.log(url);
const connection = mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
const collections = Object.keys(mongoose.connection.collections);
console.log(collections);

var db = mongoose.connection;

//endregion

//region Express session
var sessions = require('express-session')
const oneDay = 1000*60*60*24;
app.use(sessions({
    secret: process.env.SESSION_SECRET, // used to authenticate a session
    saveUninitialized: true, // allows an unmodified yet created session to be added to the store
    cookie: {maxAge: oneDay}, // when the cookie expires
    resave: false // no idea
}))

//endregion


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
//endregion







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

const port = 3001
app.listen(port, ()=> console.log("Server listening on port", port))

module.exports = app;

