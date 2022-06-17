"use strict";
import {Model} from "sequelize";

module.exports = (sequelize, DataTypes) => {
	class nguyenLieu extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	nguyenLieu.init(
		{
			tenNguyenLieu: DataTypes.STRING,
			donGia: DataTypes.INTEGER,
			donVi: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "nguyenLieu",
		}
	);
	return nguyenLieu;
};
