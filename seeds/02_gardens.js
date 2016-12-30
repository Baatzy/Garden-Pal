/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('gardens').del()
  .then(() => {
    return knex('gardens').insert([{
      id: 1,
      name: 'West',
    }, {
      id: 2,
      name: 'East',
    }, {
      id: 3,
      name: 'Raised Boxes',
    }, {
      id: 4,
      name: 'Barrels',
    },]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('gardens_id_seq', (SELECT MAX(id) FROM gardens));"
    );
  });
};
