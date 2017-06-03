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

module.exports.editPoll = (id, callback) => {
  const query = {id: id}
  PollModel.findByIdAndUpdate(query, callback);
}

module.exports.viewPoll = (id, callback) => {
  const query = {id: id}
  PollModel.findById(query, callback);
}

module.exports.deletePoll = (id, callback) => {
  const query = {_id: mongoose.Types.ObjectId(id)}
  PollModel.findByIdAndRemove(query, callback);
}