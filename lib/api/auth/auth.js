import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../../config';
const checkToken = expressJwt({ secret: config.secret });
import User from './userModel';

exports.decodeToken = () => {
  return (req, res, next) => {
    
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer  ${req.query.access_token}`;
    }

    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      }, (err) =>{
        next(err);
      });
  }
};

exports.verifyUser = () => {
  return (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    // if no username or password then send
    if (!username || !password) {
      res.status(400).send('credentials required');
      return;
    }

    User.findOne({username})
      .then((user) => {
        if (!user) {
          res.status(401).send('invalid credentials');
        } else {
          if (!user.authenticate(password)) {
            res.status(401).send('invalid credentials');
          } else {
            
            req.user = user;
            next();
          }
        }
      }, (err) => {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secret,
    {expiresIn: config.expireTime}
  );
};