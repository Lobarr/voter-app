const router = require('express').Router();
const PollModel = require('../database/models/polls')
const isLoggedIn = require('../../helpers/isLoggedIn')

router.get('/profile', isLoggedIn, (req, res) => {
  PollModel.getUserPolls(req.user.username, (err, polls) => {
    if(err) throw err
    console.log(polls);

    res.render('profile', {
      user: req.user.username,
      name: req.user.name,
      polls: polls, 
    })
  })  
});

module.exports = router;

