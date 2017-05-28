const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  options: {
    type: Array,
    required: true
  }
})

const PollModel = mongoose.model('Poll', pollSchema);

module.exports = PollModel;

module.exports.createPoll = (newPoll, callback)=>{
  newPoll.save(callback);
}