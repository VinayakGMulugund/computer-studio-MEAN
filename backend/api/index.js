const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const {connect} = require('./config/postgres');
const { auth } = require('./middlewares/auth');
const app = express()
app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/computer', require('./routes/computer'));
app.use('/api/product', require('./routes/product'));
app.use('/api/order', auth, require('./routes/computer'));
app.use('/api/studio', auth, require('./routes/studio'));
app.use('/api/cart', auth, require('./routes/computer'));


const port = process.env.PORT || 3000;
const start = async () => {
    try {
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`)
        });
        await connect();
    } catch(e) {
    }
}

start();