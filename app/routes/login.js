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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // console.log(user)
    console.log(info.message)
    req.flash('error', info.message);
    if (err) return next(err);
    if(!user) {
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if(err) return next(err)
      return res.redirect('/profile')
    })
  })(req, res, next);
  
});

module.exports = router;