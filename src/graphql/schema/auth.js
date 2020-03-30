export const typeDef = `

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  
  input AuthInput {
    email: String!
    password: String!
  }
  
  extend type Query {
    login(authInput: AuthInput): AuthData!
  }
`;
