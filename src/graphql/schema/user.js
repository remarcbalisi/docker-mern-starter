export const typeDef =  `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    createdAt: String!
    roles: [Role!]!
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
  
  input AdminUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    roles: [String!]!
  }
  
  extend type Mutation {
    register(userInput: UserInput!): User!
    adminCreateUser(adminUserInput: AdminUserInput!): User!
  }
`;
