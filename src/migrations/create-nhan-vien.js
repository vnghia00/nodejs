'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nhanVien', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      matKhau: {
        type: Sequelize.STRING
      },
      tenNV: {
        type: Sequelize.STRING
      },
      gioiTinh: {
        type: Sequelize.STRING
      },
      soDT: {
        type: Sequelize.STRING
      },
      idChucVu: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nhanVien');
  }
};