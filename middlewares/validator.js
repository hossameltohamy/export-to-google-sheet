const { body, validationResult } = require('express-validator'),
  ApiResonse = require('../helper/ApiResponse'),
  ValidationException = require('../errors/ValidationException');

exports.signupValidation = [
  body('full_name', 'full_name_null_msg').notEmpty(),
  body('email', 'email_null_msg').notEmpty(),
  body('phone', 'phone_null_msg').notEmpty(),
  body('country_code', 'country_code_null_msg').notEmpty(),
];

exports.checkRules = (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      next(new ValidationException(result.errors));
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
