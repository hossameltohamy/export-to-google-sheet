'use strict';
var { User } = require('../models/'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  configFile = require('../config/config.json');

var authsetting = require('../config/credentials'),
  ApiResonse = require('../helper/ApiResponse');

module.exports = {
  /**
   * @param {*object} req
   * @param {*object} res
   */
  async Register(req, res) {
    if (
      !req.body.full_name ||
      !req.body.email ||
      !req.body.country_code ||
      !req.body.password ||
      !req.body.phone
    ) {
      ApiResonse.setError('missing fields');
      return res.status(400).json(ApiResonse);
    }

    //hash password
    var hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;

    try {
      var newuser = await User.create(req.body);

      ApiResonse.setSuccess('User Created Successfully');

      delete newuser['dataValues'].password;
      ApiResonse.setData(newuser);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError('Error occured! please try again later ');
      return res.status(500).json(ApiResonse);
    }
  },
  /**
   * sign in
   * @param {*object } req
   * @param {*object } res
   */
  async signin(req, res) {
    try {
      
      let user = await User.findOne({ where: { email: req.body.email } });
      console.log(user);
      if (!user) {
        ApiResonse.setError('user not exist');
        return res.status(400).json(ApiResonse);
      }
     // Get credentials from JSON body
     let { email, password } = req.body;
 

      if (!bcrypt.compareSync(password, user.password)) {
        ApiResonse.setError('error in password');
        return res.status(401).json(ApiResonse);
      }

      // Create a new token with the email in the payload
      // and which expires 300 seconds after issue
      let token = jwt.sign(
        { email },
        authsetting.setting.jwtKey,
        authsetting.keyoptions
      );

      // console.log('token:', token);
      // set the cookie as the token string, with a similar max age as the token
      // here, the max age is in milliseconds, so we multiply by 1000
      res.cookie('token', token, {
        maxAge: authsetting.setting.jwtExpiryMilleSeconds,
      });
      //set token for user
      // await User.update({ token: token }, { where: { id: user.id } });
      let updateduser = await User.findOne({ where: { id: user.id } });

      //  if(updateduser.id !== 108 && updateduser.id !== 170 ){  // for testing , to be removed in production:
      await User.update({ token: token }, { where: { id: user.id } });
      updateduser.token = token;
      // }
      delete updateduser['dataValues'].password;

      ApiResonse.setSuccess('logged in');
      ApiResonse.setData(updateduser);
      // SetCurrentUser(updateduser);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError(error);
      return res.status(500).json(ApiResonse);
    }
  },
};
