const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

let sessionOptions = session({
    secret: 'this is the secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
})
app.use(sessionOptions)
app.use(flash())
const router = require('./router');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public')); // static file
app.set('view engine', 'ejs'); // ejs


app.use('/', router);


module.exports = app
