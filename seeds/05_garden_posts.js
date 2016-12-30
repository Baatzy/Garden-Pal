/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('garden_posts').del()
  .then(() => {
    return knex('garden_posts').insert([{
      id: 1,
      garden_id: 1,
      post_id: 1,
    }, {
      id: 2,
      garden_id: 2,
      post_id: 2,
    }, {
      id: 3,
      garden_id: 3,
      post_id: 3,
    }, {
      id: 4,
      garden_id: 4,
      post_id: 4,
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('garden_posts_id_seq', (SELECT MAX(id) FROM garden_posts));"
    );
  });
};
