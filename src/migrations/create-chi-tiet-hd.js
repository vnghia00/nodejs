'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chiTietHD', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idHoaDon: {
        type: Sequelize.STRING,
      },
      idMonAn: {
        type: Sequelize.INTEGER
      },
      soLuong: {
        type: Sequelize.INTEGER
      },
      thanhTien: {
        type: Sequelize.INTEGER
      },
      ngayNhap: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('chiTietHD');
  }
};