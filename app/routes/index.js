const router = require('express').Router();
const PollModel = require('../database/models/polls')

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    const polls = new Promise((resolve, reject) => {
      PollModel.getAllPolls((err, polls) => {
        (err) ? reject(err) : resolve(polls)
      })      
    }).then(polls => {
      res.render('index', {
        user: true,
        username: req.user.username,
        polls: polls 
      })
    })    
  }else {
    const polls = new Promise((resolve, reject) => {
      PollModel.getAllPolls((err, polls) => {
        (err) ? reject(err) : resolve(polls)
      })      
    }).then(polls => {
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