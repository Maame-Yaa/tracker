const express = require('express');
const router = express.Router();
const { addName, mapInfo, addMap } =require('../controllers/mapController')


router.post('/addName',addName)
router.post('/getMapInfo', mapInfo)
router.post('/addMap', addMap)
module.exports = router;


