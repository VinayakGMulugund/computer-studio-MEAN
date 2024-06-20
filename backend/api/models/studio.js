const { DataTypes } = require('sequelize');
const { sequel } = require('../config/postgres');

const Studio = sequel.define('Studio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: 'studio',
  timestamps: false
});

module.exports = Studio;
