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

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

 
const app = express();


app.use(session({
  secret: 'SECTRET',
  resave: false,
  saveUninitialized: true,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: IN_PROD,
  }
}));


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
  cb(null,user)
})
passport.deserializeUser(function(obj, cb) {
  cb(null,obj)
})
passport.use(
  
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
 
    //   if (!user) {
    //     console.log('Adding new facebook user to DB..');
    //     const user = new User({
    //       accountId: profile.id,
    //       name: profile.displayName,
    //       provider: profile.provider,
    //     });
    //     await user.save();
    //     // console.log(user);
    //     return cb(null, profile);
    //   } else {
    //     console.log('Facebook User already exist in DB..');
    //     // console.log(profile);
 
    //   }
    }
  )
);
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
const router = require("./routes/router");
const admin_router = require("./routes/admin_router");
const user_router = require("./routes/user_router");



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public")); // static file
app.set("view engine", "ejs"); // ejs

app.use("/", router);
app.use("/", admin_router);
app.use("/", user_router);


app.all("*", function (req, res) {
  if (!req.session.user || req.session.user.user_role == "user") {
    res.redirect("/");
  } else {
    res.redirect("/dashboard");
  }
});
module.exports = app;
