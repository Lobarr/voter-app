const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const UserModel = require('../app/database/models/user')

function validatePassword(inputPass, userPass){
  bcrypt.compare(inputPass, userPass, (err, isMatch) => {
    if (err) throw err;
    if(isMatch){
      return true;
    }else {
      return false;
    }
  })
}



module.exports = (passport) => {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy(   
    (username, password, done) => {
      UserModel.findOne({ username: username }, (err, user) => {
        console.log(validatePassword(password, user.password))
        if (err) throw err
        if (!user) { 
          return done(null, false, {message: "Invalid User"})
        }
        if (validatePassword(password, user.password)) {
          return done(null, user, {message: 'Logged In'});
        }else {          
          return done(null, false, {message: "Invalid Password"})
        }
      });
    }
  ));

}