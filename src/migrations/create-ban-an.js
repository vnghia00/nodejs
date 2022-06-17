'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banAn', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenBanAn: {
        type: Sequelize.STRING
      },
      trangThaiBA: {
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
    await queryInterface.dropTable('banAn');
  }
};
// npx sequelize-cli db:migrate