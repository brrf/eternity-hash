'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
// const helmet = require('helmet');
const db = require('./db')

require('dotenv').config()

const app = express();
// app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));
//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

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