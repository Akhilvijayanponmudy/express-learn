// models/image.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');



const Image = sequelize.define('Image', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Image;
