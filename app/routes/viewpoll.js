const router = require('express').Router();
const PollModel = require('../database//models/polls')

function isLoggedIn(req, res, next){
  const poll = new Promise((resolve, reject) => {
    PollModel.viewPoll(req.params.id, (err, poll) => {
      (err) ? reject(err) : resolve(poll)
    }) 
  }).then(poll => {
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
  }).catch(err => {
    throw err
  })
}

router.get('/poll/:id', isLoggedIn, (req, res)=>{
  
})


module.exports = router;

