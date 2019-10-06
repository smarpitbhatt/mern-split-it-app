const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const reqMiddleware = (req, res, next)=> {
    console.log('\x1b[36m%s\x1b[0m', req.method+ ' : ' + req.url);
    next();
}

var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(reqMiddleware);

module.exports = app;