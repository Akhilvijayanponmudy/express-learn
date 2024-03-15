const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('local', 'root', 'root', {
    host: 'localhost',
    port: '10029',
    dialect: 'mysql'
});

module.exports = sequelize;
