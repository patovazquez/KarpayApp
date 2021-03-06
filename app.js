var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var validator = require('express-validator');


var methodOverride = require('method-override');
var session = require('express-session');


//var log = require(path.join(__dirname, 'middlewares', 'log.js'));


var indexRouter = require('./src/routes/index');
var adminRouter = require('./src/routes/admin');
var usersRouter = require('./src/routes/users');
var novedadesRouter = require('./src/routes/novedades');
var talleresRouter = require('./src/routes/talleres');
//var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,/*'..',*/ 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'KarpayApp',
  resave: true,
  saveUninitialized: true
}));


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/novedades', novedadesRouter);
app.use('/admin/talleres', talleresRouter);
//app.use('/admin/products', productsRouter);

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
