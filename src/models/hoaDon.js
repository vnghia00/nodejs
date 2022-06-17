'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class hoaDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hoaDon.init({
    tenKhachHang: DataTypes.INTEGER,
    idNhanVien: DataTypes.INTEGER,
    idBanAn: DataTypes.INTEGER,
    tongTien: DataTypes.INTEGER,
    chiPhiKhac: DataTypes.INTEGER,
    giamGia: DataTypes.INTEGER,
    ngayNhap: DataTypes.DATE,
    trangThaiHD: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hoaDon',
  });
  return hoaDon;
};