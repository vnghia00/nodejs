'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class nhapNguyenLieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nhapNguyenLieu.init({
    idNguyenLieu: DataTypes.INTEGER,
    tenNguyenLieu: DataTypes.STRING,
    soLuong: DataTypes.INTEGER,
    donVi: DataTypes.STRING,
    donGia: DataTypes.INTEGER,
    tongTien: DataTypes.INTEGER,
    ngayNhap: DataTypes.DATE,
    idNhanVien: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'nhapNguyenLieu',
  });
  return nhapNguyenLieu;
};