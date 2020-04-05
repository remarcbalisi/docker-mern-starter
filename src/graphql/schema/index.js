import {resolvers as UserResolver} from '~/graphql/resolver/user';
import {resolvers as AdminUserResolver} from '~/graphql/resolver/admin/user';
import {resolvers as AuthResolver} from '~/graphql/resolver/auth';
import {resolvers as RoleResolver} from '~/graphql/resolver/role';
import {typeDef as User} from '~/graphql/schema/user';
import {typeDef as Auth} from '~/graphql/schema/auth';
import {typeDef as Role} from '~/graphql/schema/role';
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
  typeDefs: [
    Schema,
    User,
    Auth,
    Role
  ],
  resolvers: merge(
    Query, UserResolver,
    AdminUserResolver,
    AuthResolver,
    RoleResolver
  ),
});
