const router = require('express').Router();
const PollModel = require('../database/models/polls')
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    const viewpoll = new Promise((resolve, reject)=>{
      PollModel.viewPoll(req.params.id, (err, poll)=>{
        (err) ? reject(err) : resolve(poll)
      })
    }).then(poll => {
      if(poll.poll.voters.indexOf(req.user.username) === -1){        
        const vote = new Promise((resolve, reject) => {
          PollModel.vote(req.params.id, req.body._vote, req.user.username, (err, poll) => {
            (err) ? reject(err) : resolve(poll)
          })  
        }).then(poll => {  
          req.flash('success', 'Successfully voted')
          res.redirect('/poll/'+req._parsedOriginalUrl.pathname.substr(6, req._parsedOriginalUrl.pathname.length))
        }).catch(err => {
          throw err;
        }) 
      }else{
        req.flash('danger', 'You already voted in this poll')
        res.redirect('/poll/'+req._parsedOriginalUrl.pathname.substr(6, req._parsedOriginalUrl.pathname.length))
      }
    }).catch(err => {
      throw err
    })
  }else { 
    const viewpoll = new Promise((resolve, reject)=>{
      PollModel.viewPoll(req.params.id, (err, poll) => {
        (err) ? reject(err) : resolve(poll);
      })
    }).then(poll => {
      if(poll.poll.voters.indexOf(req._remoteAddress) === -1){
        const vote = new Promise((resolve, reject)=>{
          PollModel.vote(req.params.id, req.body._vote, req._remoteAddress, (err, poll)=>{
            (err) ? reject(err) : resolve(poll)
          })
        }).then(poll => {
          req.flash('success', 'Successfully voted')
          res.redirect('/poll/'+req._parsedOriginalUrl.pathname.substr(6, req._parsedOriginalUrl.pathname.length))
        }).catch(err => {
          throw err
        })
      }else {      
        req.flash('danger', 'You already voted in this poll')
        res.redirect('/poll/'+req._parsedOriginalUrl.pathname.substr(6, req._parsedOriginalUrl.pathname.length))
      }
    }).catch(err => {
      throw err
    })   
  } 
}
  
router.post('/vote/:id', isLoggedIn, (req, res) => {  
})


module.exports = router;