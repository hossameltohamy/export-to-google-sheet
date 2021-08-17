var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
var swagger = require('./config/swagger');
const swaggerUI = require('swagger-ui-express'),
  configs = require('./config/config.json');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  req.op = op; next();
});

if (configs.SwaggerUI.mode === 'dev')
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swagger.swaggerDocs, swagger.options)
  );
//include routes
require('./routes')(app); 

require('./helper/cronjob')
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
