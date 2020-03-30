import User from '~/models/User';

export const typeDef =  `
  type User {
    _id: ID!
    firstName: String!
    email: String!
  }
  
  extend type Query {
    user(id: ID!): User!
    users: [User!]!
  }
  
  input UserInput {
    firstName: String!
    email: String!
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
    createUser: async (_, {userInput: {firstName, email}}) => {
      const user = new User({
        firstName: firstName,
        email: email,
      });

      try {
        return await user.save();
      } catch (error) {
        console.log(error)
      }
    }
  }
};
