'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
// const helmet = require('helmet');
const db = require('./db')
const path = require('path')

require('dotenv').config()

const app = express();

const passport = require('passport')
require('./config/passport')(passport)
// app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express Session
const session = require('express-session');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//View engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Index page (static HTML)
app.use( express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Authentication route
const authentication = require('./routes/authentication.js');
authentication(app);


//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});


//Start server
app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + process.env.PORT);
});

//Connect to database
db();