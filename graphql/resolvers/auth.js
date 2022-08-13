const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw new Error(err);
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error('User does not exist');
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Email Or Password is incorrect');
    }
    const token = jwt.sign(
      {
        userId: user.email,
        email: user.email,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
