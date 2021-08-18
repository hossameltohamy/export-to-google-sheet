/**
 * express Framework npm imported
 * @type {NPM}
 */
const createError = require('http-errors'),
  express = require('express'),
  
  /**
   * sequalize orm
   */
  Sequelize = require('sequelize'),
  op = Sequelize.Op,
  app = express();

/**
 * setup security
 */
require('./setups/security')(app);

/**
 *
 * Setup Middle wares
 *
 **/

require('./setups/middlewares')(app);
app.use(function (req, res, next) {
  req.op = op;
  next();
});
/**
 * swagger Documention setup
 */
require('./setups/swagger')(app);

/**
 * Routes
 **/
require('./routes')(app);

/**
 * Cron Job Setup every monday at 7 clock
 **/
require('./helper/cronjob');

/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 *  error handler
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
