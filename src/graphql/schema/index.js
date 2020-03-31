import {resolvers as UserResolver} from '~/graphql/resolver/user';
import {resolvers as AuthResolver} from '~/graphql/resolver/auth';
import {typeDef as User} from '~/graphql/schema/user';
import {typeDef as Auth} from '~/graphql/schema/auth';
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
  typeDefs: [Schema, User, Auth],
  resolvers: merge(Query, UserResolver, AuthResolver),
});
