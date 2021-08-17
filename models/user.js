'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.hasMany(models.Order, { through: 'user_id' }); 

    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    full_name: DataTypes.STRING,
    country_code: DataTypes.INTEGER,
    password:DataTypes.STRING,
    email: DataTypes.STRING,
    phone:DataTypes.STRING,
    token:DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};