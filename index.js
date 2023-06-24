const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

const MySQLStore = require("express-mysql-session")(session);
const IN_PROD = process.env.NODE_ENV === "production";
const path = require("path");
const encrypt = require("./helper/encrypt");
var sessionStore = new MySQLStore({
  connectionLimit: 10,
  expiration: 10800000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

const app = express();

// app.use("/dist", express.static(path.resolve(__dirname, "public", "dist")));

app.use(
  session({
    secret: "SECTRET",
    resave: false,
    saveUninitialized: true,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: IN_PROD,
    },
  })
);

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,

  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
app.use(express.static("public", { maxAge: 0 }));
// let sessionOptions = session({
//   name: process.env.SESS_NAME,
//   secret: process.env.SESS_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore,
//   cookie: {
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24,
//     secure: IN_PROD,
//   },
// });
// app.use(sessionOptions);
app.use(flash());
const router = require("./routes/router");
const admin_router = require("./routes/admin_router");
const user_router = require("./routes/user_router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs"); // ejs

app.use("/", router);
app.use("/", admin_router);
app.use("/", user_router);

app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "public"),
]);

app.all("*", function (req, res) {
  res.redirect("/");
});

module.exports = app;
