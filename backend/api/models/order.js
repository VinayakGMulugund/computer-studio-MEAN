const { DataTypes } = require('sequelize');
const { sequel } = require('../config/postgres');

const Order = sequel.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'orders',
  timestamps: false
});

module.exports = Order;
