const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
