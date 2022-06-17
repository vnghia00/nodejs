"use strict";
import {Model} from "sequelize";

module.exports = (sequelize, DataTypes) => {
	class khoNguyenLieu extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	khoNguyenLieu.init(
		{
			idNguyenLieu: DataTypes.INTEGER,
			donVi: DataTypes.INTEGER,
			soLuongDauNgay: DataTypes.INTEGER,
			soLuongNhapTrongNgay: DataTypes.INTEGER,
			soLuongCuoiNgay: DataTypes.INTEGER,
			ngayNhap: DataTypes.DATE,
			idNhanVien: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "khoNguyenLieu",
		}
	);
	return khoNguyenLieu;
};
