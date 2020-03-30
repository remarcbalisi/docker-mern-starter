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
    createUser: async (_, {userInput: {firstName, lastName, email, password}}) => {

      const userExist = await User.findOne({email: email});

      if (userExist) {
        throw new Error("Email already exist");
      }

      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await bcrypt.hash(password, 10),
        createdAt: new Date().toISOString(),
      });

      try {
        return await user.save();
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
