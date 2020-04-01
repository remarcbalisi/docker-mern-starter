import {loginUser} from '~/repositories/user';

export const resolvers = {
  Query: {
    login: async (_, {authInput}) => {
      return loginUser(authInput);
    }
  }
};
