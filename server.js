'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const helmet = require('helmet');
const db = require('./db');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const authentication = require('./routes/authentication.js');
const pieces = require('./routes/pieces.js');
const checkout = require('./routes/checkout.js');

const transactionExecuter = require('./utils/transaction-executer');
const confirmTransaction = require('./utils/confirm-transaction');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//View engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());
// app.use(cookieParser());
app.use(express.json());



//Express Session
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
  proxy: true,
  cookie: {secure: false}
}));

// Passport config
require('./config/passport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use ((req, res, next) => {
  res.header ('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept')
  res.header ('Access-Control-Allow-Credentials', true)
  res.header ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
});

//Index page (static HTML)
app.use( express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Routes
authentication(app);
pieces(app);
checkout(app);

//Check for transactions eligible transactions every 5 seconds
//const timerId = setInterval(transactionExecuter, 5000);
confirmTransaction();


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