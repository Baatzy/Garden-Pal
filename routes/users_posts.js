'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const _ = require('lodash')
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'derekww',
  api_key: '598116923584355',
  api_secret: 'dVu8A-SyKJ0PmEId3IZnYvRX4o0'
});

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
  .innerJoin('friends', 'users.id', 'friends.friend_id')
  .innerJoin('users_gardens', 'users.id', 'users_gardens.user_id')
  .innerJoin('gardens', 'users_gardens.garden_id', 'gardens.id')
  .innerJoin('garden_posts', 'garden_posts.garden_id', 'gardens.id')
  .innerJoin('posts', 'posts.id', 'garden_posts.post_id')
  .innerJoin('posts_photos', 'posts.id', 'posts_photos.post_id')
  .innerJoin('photos', 'photos.id', 'posts_photos.photo_id')
  .select('gardens.name as garden_name', 'username', 'posts.id as post_id', 'content', 'photos.url as photo_url', 'gardens.id as garden_id', 'posts.created_at as created_at', 'users.first_name', 'users.last_name', 'posts.id as post_id')
  .where('friends.user_id', userId)
  .orderBy('posts.id', 'desc')
  .then((rows) => {
    res.send(camelizeKeys(rows))
  })
  .catch((err) => {
  })


});

router.get('/api/users_posts', authorize, (req, res, next) => {
  const userId = req.token.userId;

  knex('users')
  .innerJoin('users_gardens', 'users.id', 'users_gardens.user_id')
  .innerJoin('gardens', 'users_gardens.garden_id', 'gardens.id')
  .innerJoin('garden_posts', 'garden_posts.garden_id', 'gardens.id')
  .innerJoin('posts', 'posts.id', 'garden_posts.post_id')
  .innerJoin('posts_photos', 'posts.id', 'posts_photos.post_id')
  .innerJoin('photos', 'photos.id', 'posts_photos.photo_id')
  .select('gardens.name as garden_name', 'username', 'posts.id as post_id', 'content', 'photos.url as photo_url', 'gardens.id as garden_id', 'posts.created_at as created_at', 'users.first_name', 'users.last_name', 'posts.id as post_id')
  .where('users.id', userId)
  .orderBy('posts.id', 'desc')
  .then((rows) => {
    res.send(camelizeKeys(rows))
  })
  .catch((err) => {
  })


});

router.post('/api/users_post', authorize, (req, res, next) => {
  const userId = req.token.userId;

  let { gardenId, content } = req.body;
  let postPhoto = req.files.photo.path;
  let postId;
  let photoUrl;

  if (!gardenId || !gardenId.trim()) {
    return next(boom.create(400, 'You must have a garden selected'));
  }

  if (!content || !content.trim()) {
    return next(boom.create(400, 'Post text must not be blank'));
  }

  if (!postPhoto) {
    postPhoto = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
  }

  knex('posts')
  .insert({ content }, '*')
  .then((row) => {

    postId = row[0].id;


    return cloudinary.uploader.upload(postPhoto, () => {}, {
      transformation: [
        {width: 600,
          height: 400,
          crop: "pad"}]
        })

      })
      .then((result) => {
        photoUrl = result.url;

        return knex('photos').insert({ url: photoUrl}, '*')
      })
      .then((response) => {

        return knex('posts_photos').insert({ post_id: postId, photo_id: response[0].id}, '*')

      })
      .then((photoPosts) => {

        return knex('garden_posts').insert({ garden_id: gardenId, post_id: postId }, '*')
      })
      .then((final) => {
        res.send(final)
      })
      .catch((err) => {
      })

    })






    module.exports = router;
