const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const _helperPassport = require('../../helpers/passport-config')
const UserModel = require('../database/models/user')

router.get('/login', (req, res) => {
  res.render('login', {error_msg: req.flash('error_msg')});
})

_helperPassport(passport);

router.post('/login', passport.authenticate('local', 
  { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res) => {
  console.log('login submitted')
  res.render('user', {user: req.body.username});



  //  UserModel.findOne({username: req.body.username}, (err, user) =>{
  //   if(user === null){
  //     res.send({
  //       error: "Invalid User"
  //     })
  //   } else {
  //     bcrypt.compare(req.body.password, user.password, function(err, _resPass) {
  //       if(_resPass){
  //         res.send({
  //           redirect: './user/'+req.body.username          
  //         })
  //       }else {
  //         res.send({
  //         error: 'Invalid password'
  //       })
  //       }        
  //     });
  //   }
  // })
})



module.exports = router;