// module.exports = {
//     // up: function(queryInterface, Sequelize) {
//     //   // logic for transforming into the new state
//     //   return queryInterface.addColumn(
//     //     'Todo',
//     //     'completed',
//     //    Sequelize.BOOLEAN
//     //   );
  
//     // },
  
//     // down: function(queryInterface, Sequelize) {
//     //   // logic for reverting the changes
//     //   return queryInterface.removeColumn(
//     //     'Todo',
//     //     'completed'
//     //   );
//     // }

//     up: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.changeColumn('monAn', 'hinhAnh', {
//                 type: Sequelize.BLOB('long'),
//                 allowNull: true,
//             })
//         ])
//     },

//     down: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.changeColumn('monAn', 'hinhAnh', {
//                 type: Sequelize.STRING,
//                 allowNull: true,
//             })
//         ])
//     }
//   }