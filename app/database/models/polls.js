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
      type: Object,
      required: true
    }, 
    votes: {
      type: Number,
      required: true
    },
    voters: {
      type: Array
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

module.exports.vote = (id, _vote, ip, callback) => {
  const query = {_id: mongoose.Types.ObjectId(id)}
  const vote = "poll.options."+_vote
  const update = {
    $inc: {
      [vote]: 1, 
      "poll.votes": 1
    }, 
    $push: {
      "poll.voters": ip
    }
  }
  PollModel.findByIdAndUpdate(query, update, {safe: true, upsert: true, new: true}, callback);
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
  PollModel.find({}, callback).sort({"poll.votes": 1});
}

