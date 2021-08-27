const { User } = require('../models');
var authsetting = require('../config/credentials.js');
const jwt = require('jsonwebtoken');
var ApiResonse = require('../helper/ApiResponse');

module.exports = async (req, res, next) => {
  // We can obtain the session token from the requests cookies, which come with every request
  // const token = req.cookies.token
  //we can user headers also
  const token = req.headers['authorization'];
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    ApiResonse.setError('token is missed ');
    return res.status(401).json(ApiResonse);
  }

  var payload;
  try {
    payload = jwt.verify(token, authsetting.setting.jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      ApiResonse.setError('Unauthorized,invalid token');
      return res.status(401).json(ApiResonse);
    }
    // otherwise, return a bad request error
    ApiResonse.setError('Unauthorized, bad request');
    return res.status(400).json(ApiResonse);
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  req.body.token = token;
  await User.findOne({ where: { token: token } })
    .then((user) => {
      if (user) {
        next();
      } else {
        console.log('we cant find user ');
        ApiResonse.setError(`Oops, we can'/t found user with this token`);
        return res.status(401).json(ApiResonse);
      }
    })
    .catch((err) => {
      ApiResonse.setError(
        `Oops, Error occured during set current user ${err.message}`
      );
      return res.status(500).json(ApiResonse);
    });
};
