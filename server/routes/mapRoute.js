const express = require('express');
const router = express.Router();
const { addName, mapInfo } =require('../controllers/mapController')


router.post('/addName',addName)
router.post('/getMapInfo', mapInfo)
module.exports = router;


