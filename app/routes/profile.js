const router = require('express').Router();

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    res.render('profile', {
      user: req.user.username,
      name: req.user.name
    })
  }else {
    req.flash('danger', 'Please login here')
    res.redirect('/login');
  }   
}

router.get('/profile', isLoggedIn, (req, res) => {
  res.redirect('/')
});

module.exports = router;

