const ProductController = require('../controller/ProductController');
module.exports = function (ProductRoutes) {
  ProductRoutes.post('/create', ProductController.create);
  ProductRoutes.get('/All', ProductController.GetAllProducts);
  ProductRoutes.get('/SearchById', ProductController.showProduct);
  ProductRoutes.get('/SearchByName', ProductController.SearchByName);

  return ProductRoutes;
};
