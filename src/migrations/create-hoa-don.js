'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hoaDon', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenKhachHang: {
        type: Sequelize.STRING,
      },
      idNhanVien: {
        type: Sequelize.INTEGER
      },
      idBanAn: {
        type: Sequelize.INTEGER
      },
      tongTien: {
        type: Sequelize.INTEGER
      },
      chiPhiKhac: {
        type: Sequelize.INTEGER
      },
      giamGia: {
        type: Sequelize.INTEGER
      },
      ngayNhap: {
        type: Sequelize.DATE
      },
      trangThaiHD: {
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
    await queryInterface.dropTable('hoaDon');
  }
};