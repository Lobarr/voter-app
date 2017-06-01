const router = require('express').Router();

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/profile', isLoggedIn, (req, res) => {
 console.log(req.user);
});

module.exports = router;

