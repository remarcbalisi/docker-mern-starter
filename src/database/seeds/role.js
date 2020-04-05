import Role from '~/models/Role';

const CreateRoleSeeder = async () => {
  console.log('creating role..');

  const roles = [
    {name: 'Admin'},
    {name: 'User'},
  ];

  try {
    await Role.insertMany(roles);
    console.log('roles successfully added');
  } catch (error) {
    console.log(error)
  }
};

export default CreateRoleSeeder;
