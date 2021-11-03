const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Buyer = sequelize.define('buyer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
})

module.exports = Buyer;