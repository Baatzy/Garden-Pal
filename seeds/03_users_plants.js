/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('users_plants').del()
  .then(() => {
    return knex('users_plants').insert([{
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
      "SELECT setval('users_plants_id_seq', (SELECT MAX(id) FROM users_plants));"
    );
  });
};
