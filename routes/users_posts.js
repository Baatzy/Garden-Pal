'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const _ = require('lodash')

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

router.get('/api/friends_posts', authorize, (req, res, next) => {
  const userId = req.token.userId;

  knex('users')
  .innerJoin('friends', 'users.id', 'friends.user_id')
  .innerJoin('users_gardens', 'users.id', 'users_gardens.user_id')
  .innerJoin('gardens', 'users_gardens.garden_id', 'gardens.id')
  .innerJoin('garden_posts', 'garden_posts.garden_id', 'gardens.id')
  .innerJoin('posts', 'posts.id', 'garden_posts.post_id')
  .innerJoin('posts_photos', 'posts.id', 'posts_photos.post_id')
  .innerJoin('photos', 'photos.id', 'posts_photos.photo_id')
  .select('gardens.name as garden_name', 'username', 'posts.id as post_id', 'content', 'photos.url as photo_url', 'gardens.id as garden_id', 'posts.created_at as created_at', 'users.first_name', 'users.last_name', 'posts.id as post_id')
  .where('friends.friend_id', userId)
  .then((rows) => {
    res.send(camelizeKeys(_.sortBy(rows, 'post_id')))
  })
  .catch((err) => {
    console.error(err);
  })


});






module.exports = router;
