import User from '~/models/User';
import Role from '~/models/Role';
import bcrypt from 'bcryptjs';

const CreateAdminUserSeeder = async () => {
  console.log('creating user...');

  const newUser = await new User({
    firstName: 'Remarc',
    lastName: 'Balisi',
    email: 'remarc.balisi@gmail.com',
    password: await bcrypt.hash('secret', 12),
  });

  newUser.roles.push({
    $each: await Role.find({name: 'Admin'}),
  });

  try {
    await newUser.save();
    console.log('user successfully added');
  } catch (error) {
    throw new Error(error);
  }
};

export default CreateAdminUserSeeder;
