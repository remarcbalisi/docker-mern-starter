export const typeDef =  `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
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
