const {DataTypes} = require('sequelize')
const { sequel } = require('../config/postgres')
const bcrypt = require('bcryptjs')

const User = sequel.define('User', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "ROLE_USER"
    },
    username: DataTypes.STRING
}, {
    tableName: 'users',
    timestamps: false,
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, process.env.SALT || 10);
            }
        }
    }
})

module.exports = User