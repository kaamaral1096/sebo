
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Categories = sequelize.define("Categories", {
  idCategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  timestamps: false,
});

module.exports = Categories;