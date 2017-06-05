const router = require('express').Router();
const PollModel = require('../database//models/polls')

function isLoggedIn(req, res, next){
  PollModel.viewPoll(req.params.id, (err, poll) => {
    if(err) throw err
    if(req.isAuthenticated())  {
      res.render('viewpoll', {
        user: true,
        username: req.user.username,
        poll: poll
      })
    }else {    
      res.render('viewpoll', {
        user: false,
        username: '',
        poll: poll
      })
    }  
  }) 
}

router.get('/poll/:id', isLoggedIn, (req, res)=>{
  
})


module.exports = router;

