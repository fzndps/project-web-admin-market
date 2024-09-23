const mysql = require('mysql');

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "admin_bawokmart"
})

module.exports = db