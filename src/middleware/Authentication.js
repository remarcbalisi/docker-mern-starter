import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '~/utilities/constants';
import graphqlHTTP from 'express-graphql';
import {removeNewLine, removeWhiteSpace} from '~/utilities/string';
import {find} from 'lodash';
import {hasRole} from '~/repositories/role';
import ProtectedResolvers from './ProtectedResolvers';
import User from '~/models/User';

const isAuthorized = async (userId, resolverName) => {
  const protectedResolver = find(ProtectedResolvers, {name: resolverName});
  if (protectedResolver) {
    return await hasRole(userId, protectedResolver.allowedRoles);
  }
  return true;
};

const Authenticated = async (req, res) => {

  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return req;
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return req
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch(error) {
    req.isAuth = false;
    return req
  }

  if (!decodedToken) {
    req.isAuth = false;
    return req
  }

  //validate if userId still exist in database
  if (! await User.findById(decodedToken.userId)) {
    res.status(403).end('Unauthenticated');
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  return req;
};

const Authentication = async (req, res, next) => {

  const grqlParams = await graphqlHTTP.getGraphQLParams(req);
  const singleSentence = removeNewLine(grqlParams.query);
  const resolverName = removeWhiteSpace(singleSentence)
                        .match(/{([a-zA-Z]*)/gm)[0]
                        .replace('{', '');

  req = await Authenticated(req, res);

  const protectedResolver = find(ProtectedResolvers, {name: resolverName});

  if (protectedResolver) {
    if (protectedResolver.allowedMiddleware.includes('auth') && req.isAuth === false) {
      res.status(403).end('Unauthenticated');
    }
    if ( protectedResolver.allowedMiddleware.includes('role') && !await isAuthorized(req.userId, resolverName)) {
      res.status(403).end('Unauthorized Access');
    }
  }

  next();
};

export default Authentication;
