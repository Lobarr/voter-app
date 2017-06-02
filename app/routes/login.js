const router = require('express').Router();
const passport = require('passport')
const _helperPassportConfig = require('../../helpers/passport-config')
const UserModel = require('../database/models/user')

router.get('/login', (req, res) => {
  res.render('login', {
    message: ''
  });
})

_helperPassportConfig(passport);

router.post('/login',
 passport.authenticate('local', {
   successRedirect: '/profile', 
   failureRedirect:'/login', 
   failureFlash: true
  }), (req, res) => {
    res.redirect('/')   
});

module.exports = router;