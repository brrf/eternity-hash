'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const helmet = require('helmet');

require('dotenv').config()

const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
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