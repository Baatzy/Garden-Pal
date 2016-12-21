/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('plants_type_match').del()
  .then(() => {
    return knex('plants_type_match').insert([{
      id: 1,
      plant1_id: 2,
      plant1_id: 1,
      match_type_id: 2
    }, {
      id: 2,
      plant1_id: 2,
      plant1_id: 3,
      match_type_id: 5
    }, {
      id: 3,
      plant1_id: 2,
      plant1_id: 4,
      match_type_id: 4
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('plants_type_match_id_seq', (SELECT MAX(id) FROM plants_type_match));"
    );
  });
};
