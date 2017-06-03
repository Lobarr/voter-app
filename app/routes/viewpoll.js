const router = require('express').Router();
const PollModel = require('../database/models/polls')

router.get('/poll/:id', (req, res) => {
  console.log(req.params.id)
})

module.exports = router;