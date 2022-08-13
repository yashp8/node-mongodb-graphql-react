const bcrypt = require('bcrypt');
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const graphQlResolvers = {
  events: async () => {
    try {
      const events = await Event.find().populate('creator');
      return events;
    } catch (error) {
      throw new Error(error);
    }
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find().populate('event').populate('user');
      return bookings;
    } catch (error) {
      throw new Error(error);
    }
  },

  createEvent: async (args) => {
    try {
      const event = await new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(),
        creator: '62f6c1c16f34b9ccdd1be23a',
      });
      const result = await event.save();
      const createdEvent = { ...result._doc, _id: result._doc._id };
      const user = await User.findById('62f6c1c16f34b9ccdd1be23a');
      if (!user) {
        throw new Error('User not found.');
      }
      user.createdEvents.push(result);
      await user.save();
      return createdEvent;
    } catch (error) {
      throw new Error(error);
    }
  },

  createUser: async (args) => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const userNew = await new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await userNew.save();
      return {
        ...result._doc,
        password: null,
        _id: result.id,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  bookEvent: async (args) => {
    try {
      const fatchEvent = await Event.findOne({ _id: args.eventId });
      const booking = await new Booking({
        user: '62f6c1c16f34b9ccdd1be23a',
        event: fatchEvent,
      });
      const result = await booking.save();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  cancelBooking: async (args) => {
    const booking = await Booking.findById({ _id: args.bookingId })
      .populate('event')
      .populate('user');
    await Booking.deleteOne({ _id: args.bookingId });
    return booking.event;
  },
};

module.exports = graphQlResolvers;
