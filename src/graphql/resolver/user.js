import User from '~/models/User';
import {Register, UpdateUser} from '~/repositories/user';

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
    register: async (_, {userInput}, req) => {
      return await Register(userInput);
    },
    updateUser: async (_, {updateUserInput}, req) => {
      updateUserInput['userId'] = req.userId;
      return await UpdateUser(updateUserInput)
    },
  }
};
