const router = require('express').Router();
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    res.render('index', {
      user: true,
      username: req.user.username
    })
  }else {
    res.render('index', {
      user: false,
      username: ''
    })
  }   
}

router.get('/', isLoggedIn, (req, res)=>{
  
})

module.exports = router;