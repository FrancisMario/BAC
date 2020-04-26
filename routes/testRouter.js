var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.render('dashboard', { 
    title: 'Dashboard Test',
    content_header:'Dashboard',
    breadcrumbs:['Home','Dashboard'],
    /**
     * Config Values
     */
    config:{
      map_api:process.env.GOOGLE_MAPS_API_KEY,
    },
    /**
     * Only 4 stats are supported for now 
     * Stat colors
     *    Blue = bg-info
     *    Green = bg-success
     *    Yellow = bg-warning
     *    Red = bg-danger
     */
    stat:[
      {figure:"10.000",name:"Registrations",link:"/#",icon:"ion-person-add",color:"bg-success"},
      {figure:"1,400",name:"Not Registered",link:"/#",icon:"ion-person-add",color:"bg-info"},
      {figure:"500",name:"Visits",link:"/#",icon:"ion-person-add",color:"bg-warning"},
      {figure:"500",name:"Registrations",link:"/#",icon:"ion-person-add",color:"bg-danger"},
    ]
   });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/login');
  }
}

module.exports = router;
