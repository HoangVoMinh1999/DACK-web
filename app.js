require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
var mongoose=require('mongoose');
var mongodb=require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter=require('./routes/products');
var loginRouter=require('./routes/login');
var cartRouter=require('./routes/cart');
var shipRouter=require('./routes/shipping');
var detailRouter=require('./routes/product_detail');
var accountRouter=require('./routes/account');
var newPasswordRouter=require('./routes/forget_password');
var searchRouter=require('./routes/search_adv');
var historyRouter=require('./routes/history')

var app = express();

var uri = process.env.DB_LOCALHOST || process.env.DB_ATLAS;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/login',loginRouter);
app.use('/cart',cartRouter);
app.use('/shipping',shipRouter);
app.use('/product_detail',detailRouter);
app.use('/account',accountRouter);
app.use('/forget_password',newPasswordRouter);
app.use('/search',searchRouter);
app.use('/history',historyRouter);

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
