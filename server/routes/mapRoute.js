// Import the express module to use its functionalities for routing.
const express = require('express');

// Create a router object from Express to handle routing.
// This object lets us define routes (paths) that the app can respond to.
const router = express.Router();

// Import the addName function from the mapController file.
// This function will be called when a certain route is accessed.
const { addName } = require('../controllers/mapController');

// Define a POST route for '/addName'.
// POST routes are typically used for sending data to the server to create/update resources.
// Here, when the server receives a POST request at '/addName', it will execute the addName function.
router.post('/addName', addName);

// Export the router so it can be used in other parts of our application,
// specifically, to be mounted in the main server file (like index.js).
module.exports = router;
