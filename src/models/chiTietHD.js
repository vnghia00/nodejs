'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class chiTietHD extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chiTietHD.init({
    idHoaDon: DataTypes.INTEGER,
    idMonAn: DataTypes.INTEGER,
    soLuong: DataTypes.INTEGER,
    thanhTien: DataTypes.INTEGER,
    ngayNhap: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'chiTietHD',
  });
  return chiTietHD;
};