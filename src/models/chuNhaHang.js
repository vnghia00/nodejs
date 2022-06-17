"use strict";
import {Model} from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class chuNhaHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chuNhaHang.init(
    {
      email: DataTypes.STRING,
      matKhau: DataTypes.STRING,
      tenChuNH: DataTypes.STRING,
      soDT: DataTypes.STRING,
      tenNH: DataTypes.STRING,
      diaChi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chuNhaHang",
    }
  );
  return chuNhaHang;
};
