const router = require('express').Router();
const PollModel = require('../database/models/polls')
const isLoggedIn = require('../../helpers/isLoggedIn')

router.get('/profile', isLoggedIn, (req, res) => {
  const poll = new Promise((resolve, reject)=> {
    PollModel.getUserPolls(req.user.username, (err, polls) => {
      (err) ? reject(err) : resolve(polls)
    })  
  }).then(polls => {
    res.render('profile', {
      user: req.user.username,
      name: req.user.name,
      polls: polls, 
    })
  }).catch(err => {
    throw err
  })
});

module.exports = router;


