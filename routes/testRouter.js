var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', {
    title: 'Dashboard Test',
    content_header: 'Dashboard',
    breadcrumbs: ['Home', 'Dashboard'],
    /**
     * User details
     */
    user: {
      name: "Mario Gomez",
      access_level: "",
      pic_url: "https://via.placeholder.com/150"
    },

    /**
     * Config Values
     */
    config: {
      map_api: process.env.GOOGLE_MAPS_API_KEY,
    },
    /**
     * Only 4 stats are supported for now 
     * Stat colors
     *    Blue = bg-info
     *    Green = bg-success
     *    Yellow = bg-warning
     *    Red = bg-danger
     */
    stat: [{
        figure: "10.000",
        name: "Registrations",
        link: "/#",
        icon: "ion-person-add",
        color: "bg-success"
      },
      {
        figure: "1,400",
        name: "Not Registered",
        link: "/#",
        icon: "ion-person-add",
        color: "bg-danger"
      },
      {
        figure: "500",
        name: "Visits",
        link: "/#",
        icon: "ion-person-add",
        color: "bg-warning"
      },
      {
        figure: "243",
        name: "Outstanding Payments",
        link: "/#",
        icon: "ion-person-add",
        color: "bg-info"
      },
    ],
    /**
     * Accessible Features
     * features which the user will have access to on the platform
     */

    accessible_features: [{
        name: "Dashboard",
        icon: "fa-tachometer-alt",
        children: []
      },
      {
        name: "Tax",
        icon: "fa-coins",
        children: [{
            name: "Registrations",
            id: "id-reg-1"
          },
          {
            name: "Addresses",
            id: "id-ad-1"
          },
          {
            name: "Test",
            id: "id-test-0"
          },
        ]
      },

      {
        name: "Business",
        icon: "fa-store",
        children: [{
            name: "Registrations",
            id: "id-reg-1"
          },
          {
            name: "Addresses",
            id: "id-ad-1"
          },
          {
            name: "Test",
            id: "id-test-1"
          },
        ]
      },

      {
        name: "Departments",
        icon: "fa-building",
        children: [{
            name: "Accounting",
            id: "id-col-1"
          },
          {
            name: "Tech Support",
            id: "id-acc-1"
          },
          {
            name: "Tax Collectors",
            id: "id-test-2"
          },
        ]
      },

    ],
  });
});

module.exports = router;