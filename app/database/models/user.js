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
  }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

module.exports.createUser = (newUser, callback)=>{
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = (username, callback) => {
	const query = {username: username};
	UserModel.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
	UserModel.findById(id, callback);  
}

module.exports.comparePassword = (inputPassword, hash, callback) => {
	bcrypt.compare(inputPassword, hash, (err, isMatch) => {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}



