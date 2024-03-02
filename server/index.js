// Load necessary packages
const express = require('express'); // Express is a framework to help build web servers
require('dotenv').config(); // Loads settings from .env file into the application
const cors = require('cors'); // CORS allows the server to accept requests from different domains
const db = require('./db'); // Sets up the connection to the database

// Initialize the express application
const app = express();

// Middleware
app.use(express.json()); // This helps the server understand requests in JSON format
app.use(cors()); // This tells the server it's okay to respond to requests from other websites

// Import routes from the router file
const router = require('./routes/mapRoute');

// Set up routing
// Any URL that starts with '/api' will use the routes defined in the router file
app.use('/api', router);

// Get the port number from the .env file, or use 3000 by default if not specified
const port = process.env.PORT || 3000;

// Start the server and listen for requests on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Prints a message once the server starts successfully
});
