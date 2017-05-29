const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../app/database/models/user')
const validatePassword = require('../app/database/models/user').validatePassword

function isValidPassword(user, password){
  return bCrypt.compareSync(password, user.password);
}

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
 
  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local',new LocalStrategy(    
    function(username, password, done) {
      console.log('inside passport');
      UserModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { console.log('Invalid user'); return done(null, false, req.flash('error_msg', "Invalid user"))}
        if (validatePassword(password, user.password) === false) {
          console.log('Invalid password');
            return done(null, false, req.flash("error_msg", 'Invalid Password'))
        }else {
          console.log("Signed in")
          return done(null, user);
        }      
      });
    }
  ));
}