/**
 * helmet for Secure ExpressJS Application
 * @type {NPM}
 */
const helmet = require('helmet'),
  /**
   * xss for Secure ExpressJS Application (avoid XSS Attacks)
   * @type {NPM}
   */
  xss = require('xss-clean'),
  rateLimit = require('express-rate-limit'),
  hpp = require('hpp'),
  cors = require('cors');

module.exports = function (app) {
  //Set security headers
  app.use(helmet());

  //Prevent XSS attacks
  app.use(xss());

  //Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
  });
  app.use(limiter);

  //Prevent http param pollution
  app.use(hpp());

  //Enable CORS
  app.use(cors());
};
