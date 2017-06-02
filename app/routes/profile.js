const router = require('express').Router();
const isLoggedIn = require('../../helpers/isLoggedIn')


router.get('/profile', isLoggedIn, (req, res) => {
  console.log('inside profile route')
  res.render('profile', {
    user: req.user.username
  })
});

module.exports = router;

