const router = require('express').Router();
const PollModel = require('../database/models/polls')

router.get('/delete/:id', (req, res) => {
  console.log(req.params.id)
  PollModel.deletePoll(req.params.id, (err, response) => {
    if(err) throw err
    req.flash('success', 'Poll Deleted!');
    res.redirect('/profile')
  })
})

module.exports = router;