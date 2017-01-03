'use strict';

/* eslint-disable new-cap, no-console, prefer-const, max-len*/

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const cloudinary = require('cloudinary');


// eslint-disable new-cap
const router = express.Router();

cloudinary.config({
  cloud_name: 'derekww',
  api_key: '598116923584355',
  api_secret: 'dVu8A-SyKJ0PmEId3IZnYvRX4o0'
});

router.post('/api/users', (req, res, next) => {
  let { firstName, lastName, email, password, username, profilePic  } = req.body;
  console.log(req);

  console.log(req.body);

  if (!firstName || !firstName.trim()) {
    return next(boom.create(400, 'First Name must not be blank'));
  }

  if (!lastName || !lastName.trim()) {
    return next(boom.create(400, 'Last Name must not be blank'));
  }

  if (!username || !username.trim()) {
    return next(boom.create(400, 'Username must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(
      400,
      'Password must be at least 8 characters long'
    ));
  }

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  knex('users')
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(400, 'Username already exists');
      }
    })
    .then(() => {
      console.log('swag');
      cloudinary.uploader.upload(profilePic, function(result) {
        console.log(result)
        console.log('yolo');
      });
    }).then(() => {

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      firstName = firstName.toLowerCase();
      lastName = lastName.toLowerCase();
      email = email.toLowerCase();
      username = username.toLowerCase();
      const insertUser = { firstName, lastName, email, hashedPassword, username };

      return knex('users')
        .insert(decamelizeKeys(insertUser), '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 50); // 3 hours
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '50h'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
