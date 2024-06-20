const express = require('express');
const router = express.Router();

const { getCart, addComputerToCart, deleteComputerFromCart } = require('../controllers/cart')

router.get('', getCart)
router.post('', addComputerToCart)
router.delete('/:id', deleteComputerFromCart)

module.exports = router