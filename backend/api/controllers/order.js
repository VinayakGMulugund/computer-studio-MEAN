const { where, Model } = require('sequelize');
const { Order, Computer } = require('../models/model')


const getAllOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.findAll({where: {userId}});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error});
    }
}

const getOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findByPk(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({error});
    }
}

const addComputerToOrder = async (req, res) => {
    try {
        const {computerId} = req.body;
        const computer = await Computer.findByPk(computerId);
        if (!computer)
            res.status(400).json({message: "Computer Not found"});
        const {id} = req.params;
        const order = Order.findByPk(id);
        await order.addComputer(computer);
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error});
    }
}

const deleteComputerFromOrder = async (req, res) => {
    try {
        const {computerId} = req.query;
        const computer = await Computer.findByPk(computerId);
        if (!computer)
            res.status(400).json({message: "Computer Not found"});
        const {id} = req.params;
        const order = Order.findByPk(id);
        await order.removeComputer(computer);
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error});
    }
}

module.exports = {getOrder, getAllOrders, addComputerToOrder, deleteComputerFromOrder}