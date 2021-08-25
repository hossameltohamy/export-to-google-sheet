'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order_items, { foreignKey: 'product_id' });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      merchant_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: false,
      modelName: 'Product',
    }
  );
  return Product;
};
