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

module.exports.validatePassword = (inputPass, userPass) => {
  bcrypt.compare(inputPass, userPass, (err, isMatch) => {
    if (err) throw err;
    if(isMatch){
      return true; //the case where the password matches
    }else {
      return false;
    }
  })
}

module.exports.validateUser = (inputUsername) => {
  UserModel.findOne({username: inputUsername}, (err, user)=>{
    return user;
  })
}
    