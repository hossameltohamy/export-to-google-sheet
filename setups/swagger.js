const swagger = require('../config/swagger'),
  swaggerUI = require('swagger-ui-express'),
  configs = require('../config/config');

module.exports = function (app) {
  // enable swagger in dev environment
  if (configs.SwaggerUI.mode == 'dev') {
    app.use(
      '/api-docs',
      swaggerUI.serve,
      swaggerUI.setup(swagger.swaggerDocs, swagger.options)
    );
  }
};
