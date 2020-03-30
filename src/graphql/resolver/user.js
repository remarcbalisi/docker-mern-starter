import User from '~/models/User';
import bcrypt from 'bcryptjs';

export const typeDef =  `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: String!
  }
  
  extend type Query {
    user(id: ID!): User!
    users: [User!]!
  }
  
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  
  extend type Mutation {
    createUser(userInput: UserInput!): User!
  }
`;

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
        console.log(error)
      }
    }
  }
};
