var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stockRouter = require('./routes/stockRouter');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');


var app = express();
//mongoose.connect('mongodb://localhost:27017/riafy_db')
mongoose.connect('mongodb+srv://manju:manju@cluster0.ajzha.mongodb.net/riafy_db')


app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));

function logMiddleware(req,res,next)
{
  console.log("Function logMiddleware");
  next();
}
app.use(logMiddleware);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(session({
  secret:"secretstring123",
  resave:false,
  saveUninitialized:true
}));





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stocks', stockRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
