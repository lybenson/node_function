var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var expressSession = require('express-session')
var passport = require('./passport-config');
var flash = require('connect-flash');

var app = express();
app.use(flash())
app.use(expressSession({
	secret: 'AccessToken',
  cookie: {
    maxAge: 10000
  },
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


module.exports = app;
