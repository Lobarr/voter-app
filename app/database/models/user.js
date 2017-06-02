const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,    
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  polls: {
    type: Array
  }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

module.exports.createUser = (newUser, callback)=>{
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	UserModel.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	UserModel.findById(id, callback);
}

module.exports.comparePassword = function(inputPassword, hash, callback){
	bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}



