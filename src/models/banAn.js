'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class banAn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banAn.init({
    tenBanAn: DataTypes.STRING,
    trangThaiBA: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'banAn',
  });
  return banAn;
};