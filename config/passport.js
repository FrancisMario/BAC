const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/adminConfig'); // Changed the user modal,"I MADE A SYSTEM REDESIGN TO REDUCE FUTURE COMPLEXITY"
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy({ usernameField: 'email' },function(email, password, done){
    // Match Username
    let query = {adminCredentials:{email : email}}; // 
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, user.adminCredentials.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
