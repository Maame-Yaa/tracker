
//call the mysql module
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'FINAL_YEAR_PROJECT',
    port:3306
})

connection.connect(function(err){
    if(err){
        throw err;
    }
    else{
       console.log('Database Connected Successfully')
    }
})

//to export connection
module.exports = connection