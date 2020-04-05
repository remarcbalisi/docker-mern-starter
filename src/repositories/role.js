import Role from '~/models/Role';
import User from '~/models/User';

const createRole = async payload => {
  const roleExist = await Role.findOne({name: payload.name});

  if(roleExist) {
    throw new Error(`Role ${payload.name} already exist`);
  }

  const role = new Role({
    ... payload
  });

  try {
    return await role.save();
  } catch(error) {
    throw new Error(error)
  }
};

const hasRole = async (userId, roles) => {
  const user = await User.findById(userId).populate({
    path: 'roles',
    match: {
      name: {
        $in: roles
      }
    }
  });

  if (user.roles.length === 0) {
    return false;
  }

  return user.roles;
};

export {
  createRole,
  hasRole
}
