/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('users_gardens').del()
  .then(() => {
    return knex('users_gardens').insert([{
      id: 1,
      user_id: 1,
      garden_id: 2
    }, {
      id: 2,
      user_id: 1,
      garden_id: 1
    }, {
      id: 3,
      user_id: 2,
      garden_id: 3
    }, {
      id: 4,
      user_id: 2,
      garden_id: 4
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('users_gardens_id_seq', (SELECT MAX(id) FROM users_gardens));"
    );
  });
};
