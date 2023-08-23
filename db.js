const mysql = require("mysql")

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "mxhalisalm011216",
  database: "ljewels",
})

db.connect((err) => {
  if (err) throw err
  console.log("Connected to the database")
})

module.exports = db
