const { DataTypes } = require("sequelize");
const sequelize = require('../database')

const Transactions = sequelize.define('transaction', {
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    buyerData: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
});

// Relacionamentos
const Users = require('./users');
const Products = require('./products');

Transactions.belongsTo(Users, { foreignKey: 'sellerId', targetKey: 'idUsers' });
Transactions.belongsTo(Users, { foreignKey: 'buyerId', targetKey: 'idUsers' });
Transactions.belongsTo(Products, { foreignKey: 'productsId', targetKey: 'idProducts' });

module.exports = Transactions;