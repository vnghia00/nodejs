'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class nhanVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nhanVien.init({
    email: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    tenNV: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    soDT: DataTypes.STRING,
    idChucVu: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'nhanVien',
  });
  return nhanVien;
};