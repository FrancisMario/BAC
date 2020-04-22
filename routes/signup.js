var express = require('express');
const Token = require('../models/token')
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken');
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
router.get('/register', function (req, res, next) {
  console.log("signup");
  res.render('signup', { style: style, title: "Signin" });
});

//GET login page
router.get('/login', (req, res, next) => {
  res.render('login')
})

//Validation Schema For Registration
const schema = Joi.object({
  businessName: Joi.string().min(3).max(30).required(),
  yearFounded: Joi.number().min(1999).max(2020).required(),
  businessId: Joi.string().min(5).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

//Validation Schema for Logging In
const loginSchema = Joi.object({
  businessId: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})


// Create new account => Signup
router.post('/register', (req, res, next) => {
  //Validate input from user
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({
    error: error.details[0].message
  })

  const newUser = new User({
    businessName: req.body.businessName,
    businessId: req.body.businessId,
    yearFounded: req.body.yearFounded
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "Server error"
        })
      }
      newUser.password = hash
      newUser.save((err, success) => {
        if (err) return res.status(500).json({
          message: "Server error"
        });
        res.status(201).json({
          message: "User created successfully"
        })
      })
    })
  })

});

//Logging In
router.post('/login', (req, res, next) => {
  //Validate input from user
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({
    error: error.details[0].message
  })

  User.findOne({ businessId: req.body.businessId }, (err, user) => {
    if (err) return res.status(500).json({
      message: "Server error"
    })
    if (!user) return res.status(404).json({
      message: "Business ID or Password Incorrect"
    })
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return res.status(500)
      if (isMatch) {
        loggedUser = { name: user.businessName, id: user._id }
        const accessToken = generateAccessToken(loggedUser);
        const refreshToken = jwt.sign(loggedUser, process.env.REFRESH_TOKEN_SECRET)
        let newToken = new Token({
          token: refreshToken
        })
        newToken.save((err, done) => {
          if (err) return res.status(500).json({
            message: "Could not store refresh token"
          })
        })
        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken
        })
      } else {
        return res.status(403).json({
          message: "Business ID or Password Incorrect"
        })
      }
    })
  })
});

//Refresh Token
router.post('/token', (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401).json({
    message: "Token cannot be null"
  })
  Token.findOne({ token: refreshToken }, (err, foundToken) => {
    if (err) return res.status(500).json({ message: "There as been an unexpected error" })
    if (foundToken == null) return res.status(403).json({ message: "Access denied" })
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Access denied" })
      loggedUser = { name: user.businessName, id: user._id }
      const accessToken = generateAccessToken(loggedUser)
      res.json({
        accessToken: accessToken
      })
    })
  })
});

//Logout or Simply Delete Token
router.delete('/logout', (req, res) => {
  Token.deleteOne({ token: req.body.token }, (err, done) => {
    if (err) return res.status(403).json({ message: "Access denied" })
    res.status(204).json({ message: "Token successfully deleted" })
  })
})



//Generate Access Token
function generateAccessToken(loggedUser) {
  return jwt.sign(loggedUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
}

/* The function below is gonna be added as a middleware
 to all the protected routes that require authentication and most importantly, authorization */

/*
function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null) return res.status(401).json({
    message:"Permission denied"
  })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({
      message:"Permission denied"
    })
    req.user = user
    next()
  })
}

*/

module.exports = router;
