var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var employeeRouter = require('./routes/employee.routes');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/employee', employeeRouter);

// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
      res.status(500).json({
        error:err.message
      });

});

module.exports = app;
