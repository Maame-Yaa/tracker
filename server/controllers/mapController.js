const db = require('../db');

module.exports.addName = (req, res) => {
    const name = req.body.name;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
  
    const checkName = "select * FROM store WHERE name=?";
    db.query(checkName, name, (err, response) => {
      if (response.length) {
        res.status(422).json({ msg: "This place is already added in the list!" });
      } else {
        db.query("INSERT INTO store(name, latitude, longitude) VALUES(?,?,?)", [name, latitude, longitude], (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            res.status(200).json({ msg: "Added place successfully" });
          } else {
            res.status(400).json({ msg: "Something went wrong" });
          }
        });
      }
    });
  };
  
module.exports.mapInfo = (req, res) =>{
    const name = req.body.name
    console.log(name)
    const sql = "select * from store where name=?"

    db.query(sql,name,(err,result)=>{
        console.log("result", result)
        if(result){
            console.log(result)
            res.status(200).json({result})
        }
        else{
            console.log(err)
            res.status(400).json({msg: 'Something went wrong'}) 
        }
    })
}

module.exports.addMap =(req,res)=>{

    const parentId = req.body.parentId;
    const coordinates = req.body.coordinates;
    const color = req.body.color

    const sqlQuery = "INSERT INTO store2 (parentId, coordinates, color) VALUES (?,?,?)";

    db.query(sqlQuery, [parentId, coordinates,color], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong' });
        } else {
            res.status(200).json({ msg: 'Polygon added successfully' });
        }
    });
};


module.exports.getAllMaps=(req,res)=>{

    const selectsql="SELECT * FROM store"

    db.query(selectsql,(err,result)=>{
        if(result){
            res.status(200).json(result);
        }
        if(err){
            res.status(400).json({ msg: 'Something went wrong' });
        }
    })
}

module.exports.getGeoMapInfo = (req, res) => {
    const parentId = req.body.parentId; // Make sure this matches your request
    // console.log(parentId)

    const sqlquery = "SELECT * FROM store2 WHERE parentId=?";
    db.query(sqlquery, parentId, (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong' });
        } else {
            res.status(200).json({result});
        }
    });
};

module.exports.updateGeoMap = (req, res) => {
    const parentId = req.body.parentId;
    const coordinates = req.body.coordinates;
    const color = req.body.color
    console.log(color)
    const updateSql = "UPDATE store2 SET coordinates = ?, color=? where parentId=?";
  
    db.query(updateSql, [coordinates, color, parentId], (err, result) => {
      if (result) {
        res.status(200).json({ msg: "Updated" });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    });
  };

  module.exports.deleteMap = (req,res)=>{
    const id = req.params.id
    const deleteSql = "DELETE FROM store2 where parentid=?"
    db.query(deleteSql,id,(err,result)=>{
        if(result){
            res.send("Deleted Map successfully")
        }
        else{
            res.status(400).json({message:"Something went wrong"})
        }
    })
}

module.exports.deleteMapName = (req,res)=>{
    const id = req.params.id
    const deleteSql = "DELETE FROM store where id=?"
    db.query(deleteSql,id,(err,result)=>{
        if(result){
            res.send("Deleted Map successfully")
        }
        else{
            res.status(400).json({message:"Something went wrong"})
        }
    })
}

module.exports.getAllCoordinateMaps=(req,res)=>{
    const selectsql = "SELECT * FROM store2"
    db.query(selectsql,(err,result)=>{
        if(result){
            res.status(200).json(result)
        }
        if(err){
            res.status(400).json({msg:'Something went wrong'})
        }
    })
}
  
module.exports.viewAllMaps = (req,res)=>{

    const selectSql = "SELECT coordinates,color from store2"

    db.query(selectSql,(err,result)=>{
        if(result){
            console.log(result)
            res.status(200).json(result)
        }
        if(err){
            res.status(400).json({msg:'Something went wrong'})
        }
    })

}

module.exports.receiveTrackerData = (req, res) => {
    const { device_id, latitude, longitude } = req.body;
  
    global.io.emit('trackerUpdate', { device_id, latitude, longitude });

    res.status(200).json({ message: "Location updated successfully" });
  };
    

  module.exports.setActiveGeofence = (req, res) => {
    const parentId = req.body.parentId; // ID of the geofence to activate

    // First, set all geofences to inactive
    db.query("UPDATE store2 SET isActive = FALSE", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Error updating geofences' });
        }

        // Then, set the selected geofence to active
        db.query("UPDATE store2 SET isActive = TRUE WHERE parentId = ?", [parentId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Error setting active geofence' });
            }
            res.status(200).json({ msg: 'Active geofence updated successfully' });
        });
    });
};
