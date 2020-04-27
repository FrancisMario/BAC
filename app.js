require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database Connection established'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/register');
var signupRouter = require('./routes/login');
var testRouter = require('./routes/testRouter');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

// hbs helpers

hbs.registerHelper('breadcrump_renderer',(array) => {
   var output = '';
   var no = array.length;
   var ni = 0;
   array.forEach(crumb => {
     if (ni < no-1) {
      output += '<li class="breadcrumb-item"><a href="#">'+crumb+'</a></li>';
    } else {
      output += '<li class="breadcrumb-item active">'+crumb+'</li>';
    }
    ni +=1 ;
   }); 

   return new hbs.SafeString(output);;
});

/* MIDDLEWARE FOR NEWLY INSTALLED PACKAGES */

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});


app.use('/', indexRouter);
app.use('/signup', usersRouter);
app.use('/login', signupRouter);

// Routes for testing ui
app.use('/dashboard', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; 
  res.locals.error  = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{code:500,message:err.message});
});

module.exports = app;
