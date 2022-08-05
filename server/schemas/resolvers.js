// const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
            //   Uncomment after reactions model is added
            //   .populate('reactions')
          },
         events: async () => {
                return await Event.find()
         },
         event: async (parent, { _id }) => {
            return await Event.findById(_id)
        }    
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          }
    }
 
}



module.exports = resolvers;
