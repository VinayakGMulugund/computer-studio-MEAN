const express = require('express');
const router = express.Router();

const { updateStudio, getStudio } = require('../controllers/studio')

router.get('', getStudio)
router.patch('/update', updateStudio)


module.exports = router;