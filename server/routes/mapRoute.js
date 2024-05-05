const express = require('express');
const router = express.Router();
const { addName, mapInfo, addMap, getAllMaps, getGeoMapInfo, updateGeoMap, deleteMap, getAllCoordinateMaps, deleteMapName, viewAllMaps, receiveTrackerData, setActiveGeofence } =require('../controllers/mapController')


router.post('/addName',addName)
router.post('/getMapInfo', mapInfo)
router.post('/addMap', addMap)
router.get('/getAllMaps', getAllMaps)
router.post('/allGeoMapInfo',getGeoMapInfo)
router.post('/updateGeoMap', updateGeoMap)
router.delete('/deleteMap/:id', deleteMap)
router.get('/getAllCoordinateMaps', getAllCoordinateMaps)
router.delete('/deleteMapName/:id', deleteMapName)
router.get('/viewAllMaps', viewAllMaps)
router.post('/receiveTrackerData', receiveTrackerData);
router.post('/setActiveGeofence', setActiveGeofence);


module.exports = router;

