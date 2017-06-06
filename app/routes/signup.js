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

    const user = new Promise((resolve, reject)=> {
      UserModel.createUser(_newUser, (err, user)=>{
        (err) ? reject(err) : resolve(user)
      })
    }).then(user => {
      req.flash('success', 'User successfully created')
      res.redirect('/login')
    }).catch(err => {
      req.flash('danger', "Username Taken")
      res.redirect('/signup')
    })    
  }
  
})

module.exports = router;