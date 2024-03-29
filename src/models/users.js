const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('./../database')
const Users = sequelize.define("Users", {
    idUsers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
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
    userTypeId: {
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

module.exports = Users;