'use strict';

/* eslint-disable new-cap, no-console, prefer-const, max-len*/

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const cloudinary = require('cloudinary');
// const multer  = require('multer');
// const upload = multer();



// eslint-disable new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

cloudinary.config({
  cloud_name: 'derekww',
  api_key: '598116923584355',
  api_secret: 'dVu8A-SyKJ0PmEId3IZnYvRX4o0'
});

router.get('/api/user' , authorize, (req, res, next) => {
  const userId = req.token.userId;

  knex('users')
  .select('first_name', 'last_name', 'username', 'profile_pic')
  .where('users.id', userId)
  .then((rows) => {
    res.send(camelizeKeys(rows[0]))
  })
  .catch((err) => {
    console.error(err);
  })


});

router.post('/api/users', (req, res, next) => {
  let { firstName, lastName, email, password, username } = req.body;
  let profilePicIncoming = req.files.profilePic.path;
  let profilePic;

  console.log(req.body);
  console.log(req.files);

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

    return cloudinary.uploader.upload(profilePicIncoming, () => {}, {
      transformation: [
      {width: 400,
      height: 400,
      gravity: "face",
      crop: "thumb"}]
    })




  }).then((result) => {

    console.log(result)
    profilePic = result.url;
    console.log(profilePic);

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      firstName = firstName.toLowerCase();
      lastName = lastName.toLowerCase();
      email = email.toLowerCase();
      username = username.toLowerCase();
      profilePic = profilePic.toLowerCase();
      const insertUser = { firstName, lastName, email, hashedPassword, username, profilePic };

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
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
