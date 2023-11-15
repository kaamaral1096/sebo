const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('./../database')
const Products = sequelize.define("Products", {
    idProducts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authors: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    RegistrationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    UserTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    especialization: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false, // Desativa createdAt e updatedAt
});

module.exports = Products;