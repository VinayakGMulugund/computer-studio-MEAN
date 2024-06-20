const { where } = require('sequelize');
const {Cart, Computer} = require('../models/model')


const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = Cart.findOne({where: {user_id: userId}});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({error});
    }
}

const addComputerToCart = async (req, res) => {
    try {
        const {computerId} = req.body;
        const computer = await Computer.findByPk(computerId);
        if (!computer)
            res.status(400).json({message: "Computer Not found"});
        const userId = req.user.id;
        const cart = Cart.findOne({where: {user_id: userId}});
        await cart.addComputer(computer);
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error});
    }
}

const deleteComputerFromCart = async (req, res) => {
    try {
        const {id} = req.params;
        const computer = await Computer.findByPk(id);
        if (!computer)
            res.status(400).json({message: "Computer Not found"});
        const userId = req.user.id;
        const cart = Cart.findOne({where: {user_id: userId}});
        await cart.removeComputer(computer);
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error});
    }
}

module.exports = { deleteComputerFromCart, getCart, addComputerToCart}