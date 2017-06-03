const router = require('express').Router()
const PollModel = require('../database/models/polls')

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    res.render('newpoll', {
      user: req.user.username
    })
  }else {
    req.flash('danger', 'Please login here')
    res.redirect('/login');
  }   
}

router.get('/newpoll', isLoggedIn, (req, res) => {
  
})

router.post('/newpoll', (req, res) => {

})

module.exports = router;