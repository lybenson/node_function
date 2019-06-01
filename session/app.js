var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  },
  proxy: true
}))

app.use('/', index);

module.exports = app;
