'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class monAn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  monAn.init({
    tenMonAn: DataTypes.STRING,
    donGia: DataTypes.INTEGER,
    trangThai: DataTypes.INTEGER,
    hinhAnh: DataTypes.STRING,
    danhMuc: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'monAn',
  });
  return monAn;
};