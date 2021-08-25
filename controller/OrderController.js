'use strict';
var { Order, Product, Order_items } = require('../models/'),
  ApiResonse = require('../helper/ApiResponse');

module.exports = {
  async GetAllOrders(req, res, next) {
    console.log('orders');
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Order_items,
            as: 'Order_items',
            required: false,
            include: [
              {
                model: Product,
                as: 'Product',
                required: false,
              },
            ],
          },
        ],
      });
      ApiResonse.setSuccess('Order fetched succssefully ');
      ApiResonse.setData(orders);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError(error);
      return res.status(500).json(ApiResonse);
    }
  },
  async create(req, res, next) {
    try {
      const { user_id, products } = req.body;
      const order = await Order.create({ user_id: user_id, status: 'new' });
      for (const product of products) {
        await Order_items.create({
          order_id: order.id,
          product_id: product.id,
          quantity: product.quantity,
        });
      }
      ApiResonse.setSuccess('Order created succssefully ');
      ApiResonse.setData(order);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError(error);
      return res.status(500).json(ApiResonse);
    }
  },
};
