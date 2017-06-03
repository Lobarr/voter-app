const router = require('express').Router();
const PollModel = require('../database/models/polls')
const isLoggedIn = require('../../helpers/isLoggedIn');



router.get('/edit/:id', isLoggedIn, (req, res) => {
  console.log(req.params.id)
})

module.exports = router;