"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// hash Password
const hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	async up(queryInterface, Sequelize) {
		let password = await hashUserPassword("123456");
		// insert table
		// npx sequelize-cli db:seed:all
		return queryInterface.bulkInsert("chuNhaHang", [
			{
				id: -1,
				email: "vannghia123q@gmail.com",
				matKhau: password,
				tenChuNH: "Văn Nghĩa",
				soDT: "0389268448",
				tenNH: "Nhà hàng Văn Nghĩa",
				diaChi: "Hải Châu, Đà Nẵng",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
