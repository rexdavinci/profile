var createError = require('http-errors');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require ('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var logger = require('morgan');

var newsRoutes = require("./routes/news");
var indexRoutes = require("./routes/index");
var galleryRoutes = require("./routes/gallery");


mongoose
  .connect(
    process.env.DATABASE,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`)); // connect to database

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));


app.use("/", indexRoutes);
app.use("/news", newsRoutes);
app.use("/gallery", galleryRoutes);



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
