const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Desc is requred'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
