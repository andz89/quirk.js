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

app.use(function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

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
app.all("*", function (req, res) {
  if (!req.session.user || req.session.user.user_role == "user") {
    res.redirect("/");
  } else {
    res.redirect("/dashboard");
  }
});
module.exports = app;
