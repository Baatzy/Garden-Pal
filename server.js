/* eslint-disable max-params, no-console */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const path = require('path');
const cloudinary = require('cloudinary');
const formData = require("express-form-data");


cloudinary.config({
  cloud_name: 'derekww',
  api_key: '598116923584355',
  api_secret: 'dVu8A-SyKJ0PmEId3IZnYvRX4o0'
});

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join('public')));
app.use(formData.parse());

const test = require('./routes/test');
const users = require('./routes/users');
const token = require('./routes/token');
const usersGardens = require('./routes/users_gardens')

app.use(test);
app.use(users);
app.use(token);
app.use(usersGardens);

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(JSON.stringify(err, null, 2));

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.statusText);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
