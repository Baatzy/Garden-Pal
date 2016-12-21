/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('plants').del()
  .then(() => {
    return knex('plants').insert([{
      id: 1,
      name: 'Tomatoes',
      plant_type: 'Fruit'
    }, {
      id: 2,
      name: 'Carrots',
      plant_type: 'Root'
    }, {
      id: 3,
      name: 'Dill',
      plant_type: 'Herb'
    }, {
      id: 4,
      name: 'Thyme',
      plant_type: 'Herb'
    }, {
      id: 5,
      name: 'Beans',
      plant_type: 'Vegetable'
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('plants_id_seq', (SELECT MAX(id) FROM plants));"
    );
  });
};
