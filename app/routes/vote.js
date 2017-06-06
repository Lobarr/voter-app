const router = require('express').Router();
const PollModel = require('../database/models/polls')

router.post('/vote/:id', (req, res) => {
  PollModel.vote(req.params.id, req.body._vote, (err, poll) => {
    if (err) throw err
    console.log(poll.poll)
    console.log(req.body._vote)
    req.flash('success', 'Successfully voted!');
    res.redirect('/poll/'+req._parsedOriginalUrl.pathname.substr(6, req._parsedOriginalUrl.pathname.length))
  })  
})


module.exports = router;