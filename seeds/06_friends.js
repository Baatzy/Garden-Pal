/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('friends').del()
  .then(() => {
    return knex('friends').insert([{
      id: 1,
      user_id: 1,
      friend_id: 2,
    }, {
      id: 2,
      user_id: 2,
      friend_id: 1,
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('friends_id_seq', (SELECT MAX(id) FROM friends));"
    );
  });
};
