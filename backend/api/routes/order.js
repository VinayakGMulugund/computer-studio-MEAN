const express = require('express');
const router = express.Router();

const { getAllOrders, getOrder, addComputerToOrder, deleteComputerFromOrder } = require('../controllers/order')

router.get('', getAllOrders)
router.get('/:id', getOrder)
router.post('/:id', addComputerToOrder)
router.delete('/:id', deleteComputerFromOrder)


module.exports = router;