const { DataTypes, Transaction } = require('sequelize');
const { sequel } = require('../config/postgres');

const Computer = sequel.define('computer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  total_price: DataTypes.FLOAT,
  description: DataTypes.STRING,
  name: DataTypes.STRING
}, {
  tableName: 'computer',
  timestamps: false,
  hooks: {
    afterUpdate: async (computer) => {
      const { motherboard, cpu, gpu, storage, ram, psu, body } = await computer.reload({
        include: [
          { model: Product, as: 'motherboard' },
          { model: Product, as: 'cpu' },
          { model: Product, as: 'gpu' },
          { model: Product, as: 'storage' },
          { model: Product, as: 'ram' },
          { model: Product, as: 'psu' },
          { model: Product, as: 'body' }
        ]
      });
      const total_price =
            (motherboard ? motherboard.price : 0) +
            (cpu ? cpu.price : 0) +
            (gpu ? gpu.price : 0) +
            (storage ? storage.price : 0) +
            (ram ? ram.price : 0) +
            (psu ? psu.price : 0) +
            (body ? body.price : 0);
      await computer.update({total_price}, { transaction: options.transaction})
    }
  }
});

module.exports = Computer;
