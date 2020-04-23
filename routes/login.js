var express = require('express');
const Token = require('../models/token')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Joi = require('@hapi/joi');
var router = express.Router();
var style =
  '#loader { \
    transition: all 0.3s ease-in-out;\
    opacity: 1;\
    visibility: visible;\
    position: fixed;\
    height: 100vh;\
    width: 100%;\
    background: #fff;\
    z-index: 90000;\
  }\
  #loader.fadeOut {\
    opacity: 0;\
    visibility: hidden;\
  }\
  .spinner {\
    width: 40px;\
    height: 40px;\
    position: absolute;\
    top: calc(50% - 20px);\
    left: calc(50% - 20px);\
    background-color: #333;\
    border-radius: 100%;\
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\
    animation: sk-scaleout 1.0s infinite ease-in-out;\
  }\
  @-webkit-keyframes sk-scaleout {\
    0% { -webkit-transform: scale(0) }\
    100% {\
      -webkit-transform: scale(1.0);\
      opacity: 0;\
    }\
  }\
  @keyframes sk-scaleout {\
    0% {\
      -webkit-transform: scale(0);\
      transform: scale(0);\
    } 100% {\
      -webkit-transform: scale(1.0);\
      transform: scale(1.0);\
      opacity: 0;\
    } \
  }';

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("signup");
  res.render('login', { login: true, style: style, title: "Signin" ,messages: req.flash('danger')});
});

//Validation Schema for Logging In
const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})


router.post('/', authenticated, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
});

router.post('/logout', ensureAuthenticated,(req, res) => {
  req.logout();
  res.redirect('/signin')
})

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/signin');
  }
}

function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('warning', 'You are already signed in')
    res.redirect('/dashboard')
  } else {
    next()
  }
}


module.exports = router;
