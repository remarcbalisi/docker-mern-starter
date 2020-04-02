export const typeDef = `
  type Role {
    _id: ID!
    name: String!
    createdAt: String!
  }
  
  extend type Query {
    role(id: ID!): Role!
    roles: [Role!]!
  }
  
  input RoleInput {
    name: String!
  }
  
  extend type Mutation {
    createRole(roleInput: RoleInput!): Role!
  }
`;
