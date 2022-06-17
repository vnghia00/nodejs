"use strict";
import {Model} from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class chucVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chucVu.init(
    {
      tenChucVu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chucVu",
    }
  );
  return chucVu;
};
