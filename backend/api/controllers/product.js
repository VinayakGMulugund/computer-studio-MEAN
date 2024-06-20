const { where } = require('sequelize');
const {Product} = require('../models/model')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({error})
    }
}

const getProductByType = async (req, res) => {
    try {
        const {type} = req.params;
        const products = await Product.findAll({where: {type}});
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({error})
    }
}

const getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        if (!product)
            res.status(400).json({message: "Doesnt exist"});
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {getAllProducts, getProduct, getProductByType}