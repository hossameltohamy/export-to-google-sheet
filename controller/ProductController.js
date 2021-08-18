'use strict';
var { Product } = require('../models/'),
  ApiResonse = require('../helper/ApiResponse');

module.exports = {
  async create(req, res) {
    try {
      const { name, price, merchant_id, status } = req.body;
      const product = await Product.create({
        name: name,
        price: price,
        merchant_id: merchant_id,
        status: status,
      });
      ApiResonse.setSuccess(`product ${product.id} Created Successfully`);
      ApiResonse.setData(product);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError(error);
      return res.status(500).json(ApiResonse);
    }
  },
  async GetAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      ApiResonse.setSuccess(`products fetched Successfully`);
      ApiResonse.setData(products);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError(error);
      return res.status(500).json(ApiResonse);
    }
  },
  async showProduct(req, res) {
    try {
      const { id } = req.query;
      const product = await Product.findByPk(id);
      if (!product) {
        ApiResonse.setError(`product not found`);
        return res.status(404).json(ApiResonse);
      }
      ApiResonse.setSuccess(`product fetched Successfully`);
      ApiResonse.setData(product);
      return res.status(200).json(ApiResonse);
    } catch (error) {
      ApiResonse.setError(error);
      return res.status(500).json(ApiResonse);
    }
  },
  async SearchByName(req, res) {
    const { name } = req.query;
    const product = await Product.findAll({
      where: {
        name: {
          [req.op.like]: '%' + name + '%',
        },
      },
    });
    if (!product) {
      ApiResonse.setError(`product not found`);
      return res.status(404).json(ApiResonse);
    }
    ApiResonse.setSuccess(`product fetched Successfully`);
    ApiResonse.setData(product);
    return res.status(200).json(ApiResonse);
  },
};
