const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const UserModel = require('../app/database/models/user')

module.exports = (passport) => {

  passport.use(new LocalStrategy(
  function(username, password, done) {
   UserModel.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Invalid User'});
   	}

   	UserModel.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

}