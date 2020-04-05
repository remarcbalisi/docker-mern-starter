import Role from '~/models/Role';

const CreateRoleSeeder = async () => {
  console.log('creating role..');

  const adminRole = await new Role({
    name: 'Admin'
  });

  try {
    await adminRole.save();
    console.log('role successfully added');
  } catch (error) {
    console.log(error)
  }
};

export default CreateRoleSeeder;
