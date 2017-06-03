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
    if (err) {
      console.log(err);
      throw err;
    }
    if (!user) {
      req.flash('danger', info.message)
      res.redirect('/login')
    }else {
      req.logIn(user, (err) => {
        if(err){
          console.log(err);
          throw err;
        }else {
          res.redirect('/profile')
        }        
      })
    }
  })(req, res, next)
})

module.exports = router;