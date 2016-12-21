/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('match_type').del()
  .then(() => {
    return knex('match_type').insert([{
      id: 1,
      type: 'No Effect Together'
    }, {
      id: 2,
      type: 'Grow Well Together'
    }, {
      id: 3,
      type: 'Helps Pest and Bug Control'
    }, {
      id: 4,
      type: 'Good for Garden in General'
    }, {
      id: 5,
      type: 'Dont Plant Together'
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('match_type_id_seq', (SELECT MAX(id) FROM match_type));"
    );
  });
};
