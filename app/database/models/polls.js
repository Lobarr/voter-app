const mongoose = require('mongoose')

const pollSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  poll: {
    title: {
      type: String,
      required: true
    }, 
    options: {
      type: Array,
      required: true
    }, 
    votes: {
      type: Number,
      required: true
    }
  }
})

const PollModel = mongoose.model('Poll', pollSchema);

module.exports = PollModel;

module.exports.createPoll = (newPoll, callback) => {
  newPoll.save(callback);
}

module.exports.getUserPolls = (username, callback) => {
  const query = {username: username}
  PollModel.find(query, callback);
}

module.exports.editPoll = (id, title, callback) => {
  const query = {_id: mongoose.Types.ObjectId(id)}
  const update = {"poll.title": title}
  PollModel.findByIdAndUpdate(query, update, {new: true}, callback);
}

// options : { ‘dog': 0, 'cat': 3, 'snake': 1 }

module.exports.vote = (id, _vote, callback) => {
  const query = {_id: mongoose.Types.ObjectId(id)}
  // const vote = `poll.options[${parseInt(_vote)}][1]`  
  const update = {
    $inc: {
    ['poll.options['+_vote+'][1]']: 1, 
    "poll.votes": 1
    }
  }
  PollModel.findByIdAndUpdate(query, update, {new: true}, callback);
}

module.exports.viewPoll = (id, callback) => {
  const query = {_id: mongoose.Types.ObjectId(id)}
  PollModel.findById(query, callback);
}

module.exports.deletePoll = (id, callback) => {
  const query = {_id: mongoose.Types.ObjectId(id)}
  PollModel.findByIdAndRemove(query, callback);
}

module.exports.getAllPolls = (callback) => {
  PollModel.find({}, callback);
}

