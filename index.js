const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);
const IN_PROD = process.env.NODE_ENV === "production";

var sessionStore = new MySQLStore({
  connectionLimit: 10,
  expiration: 10800000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

const app = express();

let sessionOptions = session({
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: IN_PROD,
  },
});
app.use(sessionOptions);
app.use(flash());
const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public")); // static file
app.set("view engine", "ejs"); // ejs

app.use("/", router);

module.exports = app;
