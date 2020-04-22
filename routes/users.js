var express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
var router = express.Router();

/* GET users listing. */
router.get('/', authenticateToken, function(req, res, next) {
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
});

//Make sure user is logged in
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

module.exports = router;
