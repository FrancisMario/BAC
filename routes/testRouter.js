var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { 
    title: 'Dashboard Test',
    content_header:'Dashboard',
    breadcrumbs:['Home','Dashboard'],
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

module.exports = router;
