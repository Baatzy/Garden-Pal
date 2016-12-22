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

//get back users plants relationships
router.get('/api/users_plants/relationships', (req, res) => {

  knex('plants')
  .innerJoin('plants_match_type', 'plants_match_type.plant1_id', 'plants.id')
  .innerJoin('match_type', 'match_type.id', 'plants_match_type.match_type_id')
  .where('plants.id', 2)
  .then((response) => {
    res.send(response)
  })
  .catch((err) => {
    res.send(err);
  })

});

// //get list of a users plants
// router.get('/api/users_plants/:id', (req, res, next) => {
//   const id = Number.parseInt(req.params.id)
//   knex('users_plants')
//   .select('*')
//   .where('user_id', id)
//   .then((response) => {
//     res.send(response)
//   })
// });


router.post('/api/users_plants', authorize, (req, res, next) => {
  const plantId = req.body.plantId;
  const userId = req.token.userId;

  const newFav = {
    plantId: plantId,
    userId: userId
  };

  knex('users_plants')
  .where('plant_id', plantId)
  .first()
  .then((rows) => {
    if (rows) {
      res.send('Plant Already Exists!')
    }
    return knex('users_plants').insert(decamelizeKeys(newFav), '*');
  })
  .then((row) => {
    res.send(row)
  })
  .catch((err) => {
    next(err)
  })

});

module.exports = router;
