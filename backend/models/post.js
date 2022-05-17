// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class POST extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Post.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false,
//         },
//       });
//     }

//   }
//   POST.init({
//     idUSERS: DataTypes.INTEGER,
//     title: DataTypes.STRING,
//     content: DataTypes.STRING,
//     likes: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'POST',
//   });
//   return POST;
// };