const { Book, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }
      throw AuthenticationError
  }},
  Mutation: {
    login: async (parent, { email,password }) => {
const user = await User.findOne({ email });
if (!user){
  throw AuthenticationError
}
const correctPw = await User.isCorrectPassword(password);
if (!correctPw){
  throw AuthenticationError
}
const token = signToken(user) ;
return { token, user };

    },
    addUser: async (parent, { args }) => {
      const user = await User.create.args;
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      throw AuthenticationError
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      throw AuthenticationError
    },
  },
};

module.exports = resolvers;
