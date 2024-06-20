const express = require('express');
const router = express.Router();

const { getAllProducts, getProduct, getProductByType } = require('../controllers/product')

router.get('', getAllProducts)
router.get('/:id', getProduct)
router.get('/type/:type', getProductByType)

module.exports = router