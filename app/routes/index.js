const router = require('express').Router();
const PollModel = require('../database/models/polls')

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    PollModel.getAllPolls((err, polls) => {
      res.render('index', {
        user: true,
        username: req.user.username,
        polls: polls 
      })
    })      
  }else {
    PollModel.getAllPolls((err, polls) => {
      res.render('index', {
        user: false,
        username: '',
        polls: polls
      })
    })       
  }   
}

router.get('/', isLoggedIn, (req, res)=>{
  
})

module.exports = router;