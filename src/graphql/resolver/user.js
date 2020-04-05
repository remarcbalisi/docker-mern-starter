import User from '~/models/User';
import {register, AdminCreateUser} from '~/repositories/user';

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
      return await register(userInput);
    },
    adminCreateUser: async (_, {adminUserInput}, req) => {
      return await AdminCreateUser(adminUserInput);
    }
  }
};
