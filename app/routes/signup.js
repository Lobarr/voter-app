const router = require('express').Router();
const UserModel = require('../database/models/user')

router.get('/signup', (req,res)=>{  
  res.render('signup')
})

router.post('/signup', (req, res)=>{
  const _newUser = UserModel({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  })
  UserModel.createUser(_newUser, (err, user)=>{
    if(err) throw err;
    console.log(user);
  })
})

module.exports = router;