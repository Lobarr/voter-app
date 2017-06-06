const router = require('express').Router();
const PollModel = require('../database/models/polls')

router.get('/delete/:id', (req, res) => {
  console.log(req.params.id)
  const poll = new Promise((resolve, reject) => {
    PollModel.deletePoll(req.params.id, (err, response) => {
      (err) ? reject(err) : resolve(response)
    })
  }).then(response => {
    req.flash('success', 'Poll Deleted!');
    res.redirect('/profile')
  }).catch(err => {
    throw err
  })  
})

module.exports = router;