const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API's Documentation",
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
var options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerDocs: swaggerDocs,
  options: options,
};
