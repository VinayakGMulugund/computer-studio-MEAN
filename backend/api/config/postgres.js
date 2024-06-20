const { Sequelize } = require('sequelize')


const sequel = new Sequelize(
    process.env.DB_URL,
    {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
});

const connect = async () => {
    try {
        await sequel.authenticate();
        console.log('Successfully connect to postgresql')
    } catch (error) {
        console.log('Error connecting to DB:', error)
    }
}

module.exports = { connect, sequel }