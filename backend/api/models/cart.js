const { DataTypes } = require('sequelize');
const { sequel } = require('../config/postgres');

const Cart = sequel.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'cart',
  timestamps: false
});

module.exports = Cart;
