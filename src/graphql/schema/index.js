import {
  resolvers as UserResolver,
} from '~/graphql/resolver/user';
import {typeDef as User} from '~/graphql/schema/user';
import {makeExecutableSchema} from 'graphql-tools';
import {merge} from 'lodash';

const Schema = `
  type Query {
    _empty: String
  }
  
  type Mutation {
    empty: String
  }
`;

const Query = {};

export const schema = makeExecutableSchema({
  typeDefs: [Schema, User],
  resolvers: merge(Query, UserResolver),
});
