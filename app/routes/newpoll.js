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
  let optionsObj = {}
  temp.map(val => {
    return optionsObj[`${val}`] = 0;
  })  
  
  const newPoll = new PollModel({
    username: req.user.username,
    poll: {
      title: req.body.title,
      options: optionsObj,
      votes: 0
    }    
  })  
  const poll = new Promise((resolve, reject)=>{
    PollModel.createPoll(newPoll, (err, poll) => {
      (err) ? reject(err) : resolve(poll)
    })
  }).then(poll => {
    req.flash('success', 'Poll created!')
    res.redirect('/profile')
  }).catch(err => {
    req.flash('danger', 'Error creating poll, please try again (Options can\'t contain symbols) ')
    res.redirect('/profile')
  }) 
})

module.exports = router;