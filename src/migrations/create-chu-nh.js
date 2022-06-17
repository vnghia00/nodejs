"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("chuNhaHang", {
			id: {
				default: 111,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
			},
			matKhau: {
				type: Sequelize.STRING,
			},
			tenChuNH: {
				type: Sequelize.STRING,
			},
			soDT: {
				type: Sequelize.STRING,
			},
			tenNH: {
				type: Sequelize.STRING,
			},
			diaChi: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("chuNhaHang");
	},
};
// create db
// npx sequelize-cli db:migrate
