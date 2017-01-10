/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('posts_photos').del()
  .then(() => {
    return knex('posts_photos').insert([{
      id: 1,
      post_id: 1,
      photo_id: 1
    }, {
      id: 2,
      post_id: 2,
      photo_id: 2
    }, {
      id: 3,
      post_id: 3,
      photo_id: 3
    }, {
      id: 4,
      post_id: 4,
      photo_id: 4
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('posts_photos_id_seq', (SELECT MAX(id) FROM posts_photos));"
    );
  });
};
