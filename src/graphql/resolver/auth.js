import User from '~/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    login: async (_, {authInput: {email, password}}) => {
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
        'supersecretkey',
        {
          expiresIn: '1h'
        }
      );

      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
      }
    }
  }
};
