const router = require('express').Router()
const PollModel = require('../database/models/polls')
const isLoggedIn = require('../../helpers/isLoggedIn')

router.get('/newpoll', isLoggedIn, (req, res) => {
   res.render('newpoll', {
      user: req.user.username
    })
})

//split option by spaces
router.post('/newpoll', (req, res) => {
  let temp = req.body.options.split(' ')
  let optionsArr = temp.map(val => {
    return [val, 0]
  })  
  
  const newPoll = new PollModel({
    username: req.user.username,
    poll: {
      title: req.body.title,
      options: optionsArr
    },
    votes: 0
  })  

  PollModel.createPoll(newPoll, (err, poll) => {
    if(err) throw err
    console.log(poll);
    req.flash('success', 'Poll created!')
    res.redirect('/profile')
  })  
})

module.exports = router;