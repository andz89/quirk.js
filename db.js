const dotenv = require("dotenv");
dotenv.config();

var mysql = require("mysql2");

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  
});

pool.getConnection(function (err) {
  if (err) throw err;

  module.exports = pool;
  const app = require("./index");
  app.listen(process.env.PORT);
  console.log("database is connected");
});
