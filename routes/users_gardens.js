'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
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

router.get('/api/user_gardens', authorize, (req, res, next) => {
  const userId = req.token.userId;

  knex('users')
  .innerJoin('users_gardens', 'users.id', 'users_gardens.user_id')
  .innerJoin('gardens', 'users_gardens.garden_id', 'gardens.id')
  .innerJoin('garden_posts', 'garden_posts.garden_id', 'gardens.id')
  .innerJoin('posts', 'posts.id', 'garden_posts.post_id')
  .innerJoin('posts_photos', 'posts.id', 'posts_photos.post_id')
  .innerJoin('photos', 'photos.id', 'posts_photos.photo_id')
  .where('users.id', userId)
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    console.error(err);
  })


});


router.get('/api/gardens', authorize, (req, res, next) => {
  const userId = req.token.userId;







});


router.post('/api/gardens', authorize, (req, res, next) => {



});

module.exports = router;
