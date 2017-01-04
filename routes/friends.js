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

module.exports = router;
