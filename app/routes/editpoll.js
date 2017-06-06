const router = require('express').Router();
const PollModel = require('../database/models/polls')
const isLoggedIn = require('../../helpers/isLoggedIn');



router.get('/edit/:id', isLoggedIn, (req, res) => {
  const poll = new Promise((resolve, reject) => {
    PollModel.viewPoll(req.params.id, (err, poll) => {
      (err) ? reject(err) : resolve(poll)
    })  
  }).then(poll => {
    res.render('editpoll', {
      user: req.user.username,
      id: poll._id,
      title: poll.poll.title,
    })  
  }).catch(err => {
    throw err
  })
})

router.post('/edit/:id', isLoggedIn, (req, res) => {
  const poll = new Promise((resolve, reject) => {
    PollModel.editPoll(req.params.id, req.body.title, (err, poll) => {
      if (err){
        reject(err)
      }else{
        resolve(poll);
      }
    })
  }).then(poll => {
    req.flash('success', 'Poll edited successfully!')
    res.redirect('/profile');
  }).catch(err => {
    throw err
  })
})

module.exports = router;