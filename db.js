const dotenv = require("dotenv");
dotenv.config();
// const {MongoClient} = require('mongodb');

// const client = new MongoClient(process.env.CONNECTIONSTRING);
// async function start() {
//     await client.connect();
//     module.exports = client.db('socialApp');
//     // db.collection.getPlanCache().clear()
//     const app = require('./index');

//     app.listen(process.env.PORT);
//     console.log('database is connected');
// }
// start()
var mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "node",
});

pool.getConnection(function (err) {
  if (err) throw err;

  module.exports = pool;
  const app = require("./index");
  app.listen(process.env.PORT);
  console.log("database is connected");
});
