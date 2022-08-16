// const Dataloader = require('dataloader');
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

// const eventLoader = new Dataloader((eventIds) => events(eventIds));

const transformEvent = (event) => ({
  ...event._doc,
  _id: event.id,
  date: dateToString(event._doc.date),
  // eslint-disable-next-line no-use-before-define
  creator: user.bind(this, event.creator),
});

const events = async (eventIds) => {
  try {
    const levents = await Event.find({ _id: { $in: eventIds } });
    return levents.map((event) => transformEvent(event));
  } catch (err) {
    throw new Error(err);
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw new Error(err);
  }
};

const user = async (userId) => {
  try {
    const luser = await User.findById(userId);
    return {
      ...luser._doc,
      _id: luser.id,
      createdEvents: events.bind(this, luser._doc.createdEvents),
    };
  } catch (err) {
    throw new Error(err);
  }
};

const transformBooking = (booking) => ({
  ...booking._doc,
  _id: booking.id,
  user: user.bind(this, booking._doc.user),
  event: singleEvent.bind(this, booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt),
});

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
