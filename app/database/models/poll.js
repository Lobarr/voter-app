const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  options: {
    type: Array,
    required: true
  }
})

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;