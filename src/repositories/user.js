import User from '~/models/User';
import Role from '~/models/Role';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '~/utilities/constants';

const loginUser = async ({email, password}) => {
  const user = await User.findOne({email: email}).select('password');

  if(!user) {
    throw new Error('User does not exist');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if(!isPasswordCorrect) {
    throw new Error('Invalid credentials')
  }

  const token = await jwt.sign(
    {userId: user.id, email: user.email},
    SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );

  return {
    userId: user.id,
    token: token,
    tokenExpiration: 1
  }
};

const register = async (payload) => {
  const userExist = await User.findOne({email: payload.email});

  if (userExist) {
    throw new Error('Email already exist');
  }

  const roleNames = payload.roles;
  delete payload.roles;
  const user = new User({
    ... payload,
    password: await bcrypt.hash(payload.password, 12)
  });

  const roles = await Role.find({name: 'User'});

  user.roles.push({
    $each: roles
  });

  try {
    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

const AdminCreateUser = async (payload) => {
  const userExist = await User.findOne({email: payload.email});

  if (userExist) {
    throw new Error('Email already exist');
  }

  const roleNames = payload.roles;
  delete payload.roles;
  const user = new User({
    ... payload,
    password: await bcrypt.hash(payload.password, 12)
  });

  const roles = await Role.find({
    'name': {
      $in: roleNames
    }
  });

  user.roles.push({
    $each: roles
  });

  try {
    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

export {
  loginUser,
  register,
  AdminCreateUser,
}