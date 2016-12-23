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
router.get('/api/users_plants/rel', authorize, (req, res, next) => {
  const userId = req.token.userId;
  let plantsArr = [];
  let matchTypes = [];
  let finalArr = [];

  knex('users_plants')
  .innerJoin('plants', 'plants.id', 'users_plants.plant_id')
  .where('users_plants.user_id', userId)
  .then((plants) => {

    plantsArr = plants.map((plant) => {
      return plant.plant_id;
    })

    return knex('plants_match_type')
    .innerJoin('plants as plants1', 'plants_match_type.plant1_id', 'plants1.id')
    .innerJoin('plants as plants2', 'plants_match_type.plant2_id', 'plants2.id')
    .innerJoin('match_type', 'match_type.id', 'plants_match_type.match_type_id')
    .select(
      'match_type_id',
      'plants1.plant_type as plant1_type',
      'plants2.plant_type as plant2_type',
      'plants1.name as plant1_name',
      'plants2.name as plant2_name',
      'plant1_id',
      'plant2_id',
      'match_type.type as match_type')
  })
  .then((matches) => {

    for (let i = 0; i < plantsArr.length; i++) {


      for (let j = 0; j < matches.length; j++) {
        if (plantsArr[i] === matches[j].plant1_id) {
          matchTypes.push(matches[j])
        }
      }

    }

    for (let i = 0; i < plantsArr.length; i++) {


      for (let j = 0; j < matchTypes.length; j++) {
        if (plantsArr[i] === matchTypes[j].plant2_id) {
          finalArr.push(matches[j])
        }
      }

    }

    res.send(finalArr);
  })
  .catch((err) => {
    res.send(err)
  })













  // console.log(userId);
  // knex('plants')
  // .innerJoin('plants_match_type', 'plants_match_type.plant1_id', 'plants.id')
  // .innerJoin('match_type', 'match_type.id', 'plants_match_type.match_type_id')
  // .where('plants.id', 2)
  // .then((response) => {
  //   res.send(response)
  // })
  // .catch((err) => {
  //   res.send(err);
  // })

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
      return next(boom.create(400, 'User already has that plant!'));
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
