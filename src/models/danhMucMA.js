'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class danhMucMA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  danhMucMA.init({
    tenDanhMuc: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'danhMucMA',
  });
  return danhMucMA;
};