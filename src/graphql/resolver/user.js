import User from '~/models/User';
import bcrypt from 'bcryptjs';
import {createUser} from '~/repositories/user';

export const resolvers = {
  Query: {
    user: async (_, {id}) => {
      return await User.findById(id);
    },
    users: async (_) => {
      return await User.find({});
    }
  },
  Mutation: {
    createUser: async (_, {userInput}, req) => {
      if(!req.isAuth) {
        throw new Error('Unauthenticated');
      }
      return await createUser(userInput);
    }
  }
};
