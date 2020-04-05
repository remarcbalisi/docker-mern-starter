import User from '~/models/User';
import {AdminCreateUser} from '~/repositories/user';

export const resolvers = {
  Query: {

  },
  Mutation: {
    adminCreateUser: async (_, {adminUserInput}, req) => {
      return await AdminCreateUser(adminUserInput);
    }
  }
};
