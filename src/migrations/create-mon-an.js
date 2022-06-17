'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('monAn', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenMonAn: {
        type: Sequelize.STRING
      },
      donGia: {
        type: Sequelize.INTEGER
      },
      trangThai: {
        type: Sequelize.INTEGER
      },
      hinhAnh: {
        type: Sequelize.BLOB('long'),
      },
      danhMuc: {
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
    await queryInterface.dropTable('monAn');
  }
};