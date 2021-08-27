const ApiResonse = require('../helper/ApiResponse');
module.exports = (err, req, res, next) => {
  var { status, message, errors } = err;
  /** catch express validator errors */
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.param] = req.t(error.msg);
    });
  }
  status = err.status || 500;
  res
    .status(status)
    .send({ status: false, message: req.t(message), validationErrors });
};
