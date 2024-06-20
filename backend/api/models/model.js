const User = require('./user');
const Studio = require('./studio');
const Product = require('./product');
const Computer = require('./computer');
const Cart = require('./cart');
const Order = require('./order');


// User - Order
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// User - Studio
User.hasOne(Studio, { foreignKey: 'user_id' });
Studio.belongsTo(User, { foreignKey: 'user_id' });

// User - Cart
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Computer - Product
Computer.belongsTo(Product, { as: 'motherboard', foreignKey: 'motherboard_id' });
Computer.belongsTo(Product, { as: 'cpu', foreignKey: 'cpu_id' });
Computer.belongsTo(Product, { as: 'gpu', foreignKey: 'gpu_id' });
Computer.belongsTo(Product, { as: 'storage', foreignKey: 'storage_id' });
Computer.belongsTo(Product, { as: 'ram', foreignKey: 'ram_id' });
Computer.belongsTo(Product, { as: 'psu', foreignKey: 'psu_id' });
Computer.belongsTo(Product, { as: 'body', foreignKey: 'body_id' });

// Studio - Product
Studio.belongsTo(Product, { as: 'motherboard', foreignKey: 'motherboard__id' });
Studio.belongsTo(Product, { as: 'cpu', foreignKey: 'cpu_id' });
Studio.belongsTo(Product, { as: 'gpu', foreignKey: 'gpu_id' });
Studio.belongsTo(Product, { as: 'storage', foreignKey: 'storage_id' });
Studio.belongsTo(Product, { as: 'ram', foreignKey: 'ram_id' });
Studio.belongsTo(Product, { as: 'psu', foreignKey: 'psu_id' });
Studio.belongsTo(Product, { as: 'body', foreignKey: 'body_id' });

// Cart - Computer relationships
Cart.belongsToMany(Computer, { through: 'CartComputers', foreignKey: 'cart_id' });
Computer.belongsToMany(Cart, { through: 'CartComputers', foreignKey: 'computer_id' });



module.exports = {User, Studio, Product, Computer, Cart, Order}