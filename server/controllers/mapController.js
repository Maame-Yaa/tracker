// Import the database connection setup from the 'db.js' file.
const db = require('../db');

// Define the addName function, which is responsible for adding a name to the database.
module.exports.addName = (req, res) => {
    // Extract the 'name' from the incoming request's body.
    const name = req.body.name;

    // Prepare an SQL query to check if the name already exists in the 'store' table.
    const checkName = "SELECT * FROM store WHERE name=?";

    // Execute the query against the database.
    db.query(checkName, name, (err, response) => {
        // If there's an error executing the query, send back an error response.
        if (err) {
            console.error(err); // Log the error for debugging purposes.
            res.status(500).json({ msg: 'Internal Server Error' }); // Inform the client about the error.
            return;
        }
        
        // If the query finds one or more entries, it means the name already exists.
        if (response.length > 0) {
            // Send a response indicating the name is already added.
            res.status(422).json({ msg: 'This name is already added in the database' });
        } else {
            // If the name doesn't exist, prepare an SQL query to insert the new name into the 'store' table.
            const insertQuery = "INSERT INTO store (name) VALUES (?)";

            // Execute the insert query.
            db.query(insertQuery, [name], (err, result) => {
                // Check for errors during the insertion.
                if (err) {
                    console.error(err); // Log the error for debugging purposes.
                    res.status(500).json({ msg: 'Internal Server Error' }); // Inform the client about the error.
                    return;
                }
                
                // If the insertion is successful, send a success message.
                res.status(200).json({ msg: 'Name added successfully' });
            });
        }
    });
};
