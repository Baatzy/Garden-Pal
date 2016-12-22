/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('plants_match_type').del()
  .then(() => {
    return knex('plants_match_type').insert([{
      id: 1,
      plant1_id: 2,
      plant2_id: 1,
      match_type_id: 2
    }, {
      id: 2,
      plant1_id: 2,
      plant2_id: 3,
      match_type_id: 5
    }, {
      id: 3,
      plant1_id: 2,
      plant2_id: 4,
      match_type_id: 4
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('plants_match_type_id_seq', (SELECT MAX(id) FROM plants_match_type));"
    );
  });
};
