var express = require('express');

const Authroutes = require('./routes/auth');
const ProductsRoutes = require('./routes/products');
const OrderRoutes = require('./routes/orders');
const AuthMiddleWare = require('./middlewares/auth');

module.exports = function (app) {
  app.use('/api/Auth/', Authroutes(express.Router()));
  app.use('/api/Order/', AuthMiddleWare, OrderRoutes(express.Router()));
  app.use('/api/products/', AuthMiddleWare, ProductsRoutes(express.Router()));
};
