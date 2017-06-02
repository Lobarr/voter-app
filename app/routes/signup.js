const router = require('express').Router();
const UserModel = require('../database/models/user')

router.get('/signup', (req,res)=>{  
  res.render('signup')
})

router.post('/signup', (req, res)=>{
  let username = req.body.username
  let _password = req.body._password

  req.checkBody('_password', 'Password do not match').equals(req.body.password)

  let errors = req.validationErrors();
  if(errors){    
    req.flash('danger', errors[0].msg);
    res.redirect('/signup')
  }else{
    const _newUser = UserModel({
      name: req.body.name,
      username: username,
      password: _password
    })  

    UserModel.createUser(_newUser, (err, user)=>{
      if(err) {        
        req.flash('danger', "Username Taken")
        res.redirect('/signup')
      }else {
        req.flash('success', 'User successfully created')
        res.redirect('/login')
        console.log(user);
      }      
    })
  }
  
})

module.exports = router;