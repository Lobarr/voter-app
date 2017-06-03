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
    }
  }
})


// let option = [
//   ['cheese', 2], 
//   ['frutes', 4]
// ]

const PollModel = mongoose.model('Poll', pollSchema);

module.exports = PollModel;

module.exports.createPoll = (newPoll, callback) => {
  newPoll.save(callback);
}