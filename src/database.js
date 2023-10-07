const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});

module.exports = sequelize;