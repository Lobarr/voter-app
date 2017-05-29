const router = require('express').Router();

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/user/:username', isLoggedIn, (req, res) => {
  res.render('user', {
    username: req.user
  });
});

module.exports = router;

