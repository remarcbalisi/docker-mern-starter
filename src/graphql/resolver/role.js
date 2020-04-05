import Role from '~/models/Role';
import {createRole} from '~/repositories/role';

export const resolvers = {
  Query: {
    role: async (_, {id}, req) => {
      return await Role.findById(id);
    },
    roles: async (_, req) => {
      return await Role.find({});
    }
  },
  Mutation: {
    createRole: async (_, {roleInput}) => {
      return await createRole(roleInput);
    }
  },
};
