'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const helmet = require('helmet');
const db = require('./db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const authentication = require('./routes/authentication.js');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

// Passport config
require('./config/passport')(passport);

//View engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Express body parser
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use( (req, res, next) => {
  req.session.username = req.body.username;
  console.log('req.session', req.session);
  return next();
});

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Index page (static HTML)
app.use( express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Routes
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