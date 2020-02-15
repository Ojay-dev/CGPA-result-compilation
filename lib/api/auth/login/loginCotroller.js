import User from '../userModel';
import {signToken} from '../auth';

exports.signin = function(req, res, next) {
  var token = signToken(req.user._id);
  res.json({login_token: token, username: req.user.username, email: req.user.email, id_num: req.user.id_num});
};