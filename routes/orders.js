var express = require('express');
var router = express.Router();
const OrderController = require('../controller/OrderController');
module.exports = function (OrderRoutes) {

  OrderRoutes.get('/All',OrderController.GetAllOrders );
  OrderRoutes.post('/create', OrderController.create);

return OrderRoutes;
};

