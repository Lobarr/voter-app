const router = require('express').Router();
const PollModel = require('../database/models/polls')
const isLoggedIn = require('../../helpers/isLoggedIn');



router.get('/edit/:id', isLoggedIn, (req, res) => {
  PollModel.viewPoll(req.params.id, (err, poll) => {
    if (err) throw err    
    res.render('editpoll', {
      user: req.user.username,
      id: poll._id,
      title: poll.poll.title,
    })  
  })  
})

router.post('/edit/:id', isLoggedIn, (req, res) => {
  PollModel.editPoll(req.params.id, req.body.title, (err, poll) => {
    if (err) throw err
    req.flash('success', 'Poll edited successfully!')
    res.redirect('/profile');
  })
})

module.exports = router;