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

router.get('/api/friends', authorize, (req, res, next) => {
  const userId = req.token.userId;

  knex('friends')
    .select('friend_id')
    .where('user_id', userId)
    .then((followedIds) => {
      const idArray = [];

      for (const id of followedIds) {
        idArray.push(id.friend_id);
      }

      return knex('users').select('first_name', 'last_name', 'id').whereIn('id', idArray);
    })
    .then((friendsList) => {
      res.send(friendsList);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/friends/:search', authorize, (req, res, next) => {
  let search = req.params.search;
  console.log(search);

  knex('users')
  .where('first_name', 'like', `%${search}%`)
  .orWhere('last_name', 'like', `%${search}%`)
  .orWhere('username', 'like', `%${search}%`)
  .orWhere('email', 'like', `%${search}%`)
  .then((result) => {
    console.log(res);
    res.send(camelizeKeys(result))
  })
  .catch((err) => {
    console.error(err);
  })

})

router.post('/api/friends', authorize, (req, res, next) => {
  const userId = req.token.userId;
  const friendId = req.body.friendId;

  const friends = { userId, friendId }

  knex('friends')
  .where('user_id', userId)
  .andWhere('friend_id', friendId)
  .first()
  .then((rows) => {
    if (rows) {
        throw boom.create(400, 'User is already following this account!');
      }

    return knex('friends').insert(decamelizeKeys(friends), '*');
  })
  .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      next(err);
    });
})

module.exports = router;
