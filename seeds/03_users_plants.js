/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('user_plants').del()
  .then(() => {
    return knex('user_plants').insert([{
      id: 1,
      user_id: 1,
      plant_id: 2
    }, {
      id: 2,
      user_id: 1,
      plant_id: 1
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('user_plants_id_seq', (SELECT MAX(id) FROM user_plants));"
    );
  });
};
