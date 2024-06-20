const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth')

const {getAllComputers, updateComputer, generateComputer} = require('../controllers/computer')


router.get('', getAllComputers)
router.patch('', auth, updateComputer)
router.get('/:id', getAllComputers)
router.post('/:id', auth, generateComputer)


module.exports = router