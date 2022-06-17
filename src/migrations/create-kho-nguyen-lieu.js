"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("khoNguyenLieu", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			idNguyenLieu: {
				type: Sequelize.INTEGER,
			},
			donVi: {
				type: Sequelize.STRING,
			},
			soLuongDauNgay: {
				type: Sequelize.INTEGER,
			},
			soLuongNhapTrongNgay: {
				type: Sequelize.INTEGER,
			},
			soLuongCuoiNgay: {
				type: Sequelize.INTEGER,
			},
			ngayNhap: {
				type: Sequelize.DATE,
			},
			idNhanVien: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("khoNguyenLieu");
	},
};
