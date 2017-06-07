const assert = require('chai').assert
const PollModel = require('../app/database/models/polls')

describe('PollModel logic', ()=>{
  it('should create a new poll', ()=>{
    const username = 'testuser'
    const title = 'testpoll'
    const options = {
      apple: 0,
      orange: 0,
      grapes: 0
    }
    const votes = 0
    
    const newPoll = PollModel({
      username: username,
      poll: {
        title: title,
        options: options,
        votes: votes        
      }
    })

    const poll = new Promise((resolve, reject)=>{
      PollModel.createPoll(newPoll, (err, poll)=>{
        (err) ? reject(err) : resolve(poll)
      })
    }).then(poll => {
      assert.equal(poll.username, username, 'Username matches')
      assert.equal(poll.poll.title, title, 'title matches')
      assert.isObject(poll.poll.options, 'options is an object')
      assert.equal(poll.poll.options, options, 'options matches')
      assert.equal(poll.poll.votes, votes, 'votes matches');
    }).catch(err => {
      assert.isOk(false, 'threw an error in createPoll')
    })
  })

  it('should get all of a users polls', ()=>{
    const username = 'testuser'
    const polls = new Promise((resolve, reject)=>{      
      PollModel.getUserPolls(username, (err, polls)=>{
        (err) ? reject(err) : resolve(polls)
      })
    }).then(polls => {
      polls.map(poll => {
        assert.equal(poll.username, username, 'Username matches')
      })
    }).catch(err => {
      assert.isOk(false, 'threw an error in getUserPolls')
    })
  })

  it('should edit a poll', ()=>{
    const username = 'testuser'
    const userPolls = new Promise((resolve, reject)=>{
      PollModel.getUserPolls(username, (err, polls)=>{
        (err) ? reject(err) : resolve(polls)
      })
    }).then(polls => {
      const _title = 'testnewtitle'
      polls.map(poll => {
        const editPoll = new Promise((resolve, reject)=>{
          PollModel.editPoll(poll._id, _title, (err, poll)=>{
            (err) ? reject(err) : resolve(poll)
          })
        }).then(poll => {
          assert(poll.poll.title, _title, 'poll titles matches')
        }).catch(err =>{
          assert.isOk(false, 'threw an error in editPoll')
        })
      })
    }).catch(err => {
      assert.isOk(false, 'threw an error in getUserPolls');
    })
  })

  it('should vote for a poll', ()=>{
    const username = 'testuser'
    const userPolls = new Promise((resolve, reject)=>{
      PollModel.getUserPolls(username, (err, polls) => {
        (err) ? reject(err) : resolve(polls)
      })
    }).then(polls =>{
      const vote = 'orange'
      polls.map(poll => {        
        let curVoteCount = poll.poll.options[vote]
        let curTotalVotes = poll.poll.votes
        const votepoll = new Promise((resolve, reject)=>{
          PollModel.vote(poll._id, vote, (err, poll) => {
            (err) ? reject(err) : resolve(poll)
          })
        }).then(poll =>{         
          const option = "poll.poll.options."+vote 
          assert.equal([option], curVoteCount++, 'vote matches')
          assert.equal(poll.poll.votes, curTotalVotes++, 'total votes matches')
        }).catch(err => {
          assert.isOk(false, 'threw and error in votePoll')
        })
      })
    }).catch(err => {
      assert.equal(false, 'threw and error in getUserPolls')
    })
  })

  it('should get a poll', ()=>{
    const username = 'testuser'
    const userpolls = new Promise((resolve, reject) =>{
      PollModel.getUserPolls(username, (err, polls) => {
        (err) ? reject(err) : resolve(polls)
      })
    }).then(polls =>{
      polls.map(poll =>{
        const id = poll._id
        const getPoll = new Promise((resolve, reject)=>{
          PollModel.viewPoll(id, (err, poll)=>{
            (err) ? reject(err) : resolve(poll)
          })
        }).then(poll =>{
          assert.equal(poll._id, id, 'ID\'s matches')
        }).catch(err =>{
          assert.isOk(false, 'threw an error in viewPoll')
        })
      })
    }).catch(err =>{
      assert.isOk(false, 'threw an error in getUserPolls')
    })
  })

  it('should delete a poll', ()=>{
    const username = 'testuser'
    const userpolls = new Promise((resolve, reject) => {
      PollModel.getUserPolls(username, (err, polls) => {
        (err) ? reject(err) : resolve(polls)
      })
    }).then(polls => {
      polls.map(poll => {
        const delPoll = new Promise((resolve, reject) => {
          PollModel.deletePoll(poll._id, (err) => {
            (err) ? reject(err) : resolve()
          })
        }).then(
          assert.isOk(true, 'deleted poll')
        ).catch(err =>{
          assert.isOk(false, 'threw an error in deletepoll')
        })
      })
    }).catch(err =>{
      assert.isOk(false, 'threw an error in getuserpolls')
    })
  })

  it('should get all polls in the database', ()=>{
    const allpolls = new Promise((resolve, reject) => {
      PollModel.getAllPolls((err, polls)=>{
        (err) ? reject(err) : resolve(polls)
      })
    }).then(polls =>{
      assert.isArray(polls, 'returned an array')
      assert.isAbove(polls.length, 2, 'arrays length is greater than 2')
    }).catch(err => {
      assert.isOk(false, 'threw an error in getallpolls')
    })
  })
})