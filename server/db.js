// Import the mysql library to interact with MySQL databases.
const mysql = require('mysql');

// Create a connection object with the database connection details.
// These should ideally be stored in environment variables for security and flexibility.
const connection = mysql.createConnection({
    host: 'localhost', // The hostname of the database server.
    user: 'root', // The username used to authenticate with the database.
    password: '', // The password used to authenticate with the database.
    database: 'FINAL_YEAR_PROJECT', // The name of the database to connect to.
    port: 3306 // The port number on which the database server is listening.
});

// Attempt to establish a connection to the database.
connection.connect(function(err) {
    // If there was an error during the connection attempt, log it and throw an error.
    if (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }

    // If the connection was successful, log a success message.
    console.log('Database Connected Successfully');
});

// Export the connection object so it can be used elsewhere in the application.
module.exports = connection;
