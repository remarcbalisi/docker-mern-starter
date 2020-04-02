import Role from '~/models/Role';

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

export {
  createRole
}
