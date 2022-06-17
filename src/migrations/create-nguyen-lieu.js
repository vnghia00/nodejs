"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("nguyenLieu", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tenNguyenLieu: {
				type: Sequelize.STRING,
			},
			donGia: {
				type: Sequelize.INTEGER,
			},
			donVi: {
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
		await queryInterface.dropTable("nguyenLieu");
	},
};
// create db
// npx sequelize-cli db:migrate
