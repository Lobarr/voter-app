const router = require('express').Router();
const PollModel = require('../database/models/polls')

router.post('/vote/:id', (req, res) => {
  const poll = new Promise((resolve, reject) => {
    PollModel.vote(req.params.id, req.body._vote, (err, poll) => {
      (err) ? reject(err) : resolve(poll)
    })  
  }).then(poll => {  
    res.redirect('/poll/'+req._parsedOriginalUrl.pathname.substr(6, req._parsedOriginalUrl.pathname.length))
  }).catch(err => {
    throw err;
  })  
})


module.exports = router;