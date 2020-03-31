import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '~/utilities/constants';

const Authentication = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if(!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  if(!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch(error) {
    console.error(error);
    req.isAuth = false;
    return next();
  }

  if(!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};

export default Authentication;
