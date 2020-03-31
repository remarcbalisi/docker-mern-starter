import User from '~/models/User';
import bcrypt from 'bcryptjs';

export const resolvers = {
  Query: {
    user: async (_, {id}) => {
      return await User.findById(id);
    },
    users: async (_) => {
      return await User.find({});
    }
  },
  Mutation: {
    createUser: async (_, {userInput}, req) => {
      if(!req.isAuth) {
        throw new Error('Unauthenticated');
      }
      const userExist = await User.findOne({email: userInput.email});

      if (userExist) {
        throw new Error('Email already exist');
      }

      const user = new User({
        ... userInput,
        password: await bcrypt.hash(userInput.password, 12)
      });

      try {
        return await user.save();
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
