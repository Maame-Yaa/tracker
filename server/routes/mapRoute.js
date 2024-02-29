const express = require('express');
const router = express.Router();
const { addName } =require('../controllers/mapController')


router.post('/addName',addName)

module.exports = router;