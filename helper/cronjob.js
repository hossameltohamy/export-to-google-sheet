const cron = require('node-cron');
const Sequelize = require('sequelize');
const { Product, Order_items } = require('../models');
const GoogleController = require('../controller/googleController');
// Schedule tasks to be run on the server.
cron.schedule('0 7 * * 1', async () => {
  console.log('running a task every monday at 7 clock');
  const products_reports = await Product.findAll({
    attributes: {
      include: [
        [
          Sequelize.fn('sum', Sequelize.col('Order_items.quantity')),
          'sold_quantity',
        ],
      ],
    },
    include: [
      {
        model: Order_items,
        attributes: [],
      },
    ],
    group: ['product.id'],
  });
  products_reports.forEach((product) => {
    GoogleController.ImportData(
      product.id,
      product.name,
      product.get('sold_quantity')
    );
  });
});
