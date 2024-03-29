const db = require('../db');

module.exports.addName = (req, res) => {
    const name = req.body.name;
    const checkName = "SELECT * FROM store WHERE name=?";
    
    db.query(checkName, name, (err, response) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: 'Internal Server Error' });
            return;
        }
        
        if (response.length > 0) {
            res.status(422).json({ msg: 'This place is already added in the list' });
        } else {
            const insertQuery = "INSERT INTO store (name) VALUES (?)";
            db.query(insertQuery, [name], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: 'Internal Server Error' });
                    return;
                }
                
                res.status(200).json({ msg: 'Added place successfully' });
            });
        }
    });
};
