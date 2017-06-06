const router = require('express').Router();
const PollModel = require('../database/models/polls')

router.get('/api/:id', (req, res) => {
  const poll = new Promise((resolve, reject) => {
    PollModel.viewPoll(req.params.id, (err, poll) => {
      (err) ? reject(err) : resolve(poll)      
    })
  }).then(poll => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(poll));
  }).catch(err => {
    console.log(err);
    res.status(404).send('Not found');
  })  
})

module.exports = router;