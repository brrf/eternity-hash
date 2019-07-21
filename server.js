'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
// const helmet = require('helmet');
const db = require('./db')

require('dotenv').config()

const app = express();
// app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
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
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
});

//Connect to database
db();