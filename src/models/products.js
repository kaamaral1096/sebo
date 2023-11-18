const { DataTypes } = require("sequelize");
const sequelize = require('./../database')
const Products = sequelize.define('Products', {
    idProducts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    edition: {
        type: DataTypes.STRING,
    },
    frequency: {
        type: DataTypes.STRING,
    },
    sellerId: {
        type: DataTypes.STRING,
    },
    isbn: {
        type: DataTypes.STRING,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
    },
    idUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    authors: {
        type: DataTypes.JSON, // Armazenando autores como JSON
    },
}, {
    timestamps: false,
});


module.exports = Products;
