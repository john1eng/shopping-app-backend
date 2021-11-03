const Sequelize = require('sequelize');

const sequelize = new Sequelize('shopping-app', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

