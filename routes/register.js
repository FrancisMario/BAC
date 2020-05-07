var express = require('express');
//const User = require('../models/userConfig');
const Joi = require('@hapi/joi');
const passport = require('passport');
const bcrypt = require('bcryptjs')
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

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  User.find({}, (err,users) => {
    let response = {
      users: users.map(user => {
        return {
          businessName: user.businessName,
          businessId: user.businessId,
          yeadrFounded: user.yeadrFounded
        }
      })
    }
    res.status(200).json(response)
  })
});*/

//Validation Schema For Registration
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

router.get('/', function (req, res, next) {
  console.log("signup");
  res.render('register', { login: true, style: style, title: "Register" ,messages: req.flash('danger')});
});

// Create new account => Signup
/*
router.post('/', authenticated, (req, res, next) => {
  //Validate input from user
  const { error } = schema.validate(req.body);
  if (error) {
    req.flash('danger',error.details[0].message)
    res.redirect('/signup')
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          req.flash('Unexpected error occured')
          res.redirect('/signup')
        }
        else {
          newUser.password = hash
          newUser.save((err, success) => {
            if (err) {
              req.flash('danger','Unexpected error occured')
              res.redirect('/signup')
            }else{
              req.flash('success', "Account created successfully");
              res.redirect('/login')
            }
          })
        }
      })
    })
  }
});

*/

function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('warning', 'You are already signed in')
    res.redirect('/dashboard')
  } else {
    next()
  }
}

module.exports = router;
