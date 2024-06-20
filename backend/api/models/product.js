const { DataTypes } = require('sequelize');
const { sequel } = require('../config/postgres');

const Product = sequel.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM,
    values: ['MOTHERBOARD', 'CPU', 'GPU', 'STORAGE', 'RAM', 'PSU', 'BODY'],
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'product',
  timestamps: false
});

module.exports = Product;
