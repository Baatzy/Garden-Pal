/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('photos').del()
  .then(() => {
    return knex('photos').insert([{
      id: 1,
      url: 'https://res.cloudinary.com/derekww/image/upload/v1483726202/ecoqyqyr3mweferxgqbk.jpg',
    }, {
      id:2,
      url: 'https://res.cloudinary.com/derekww/image/upload/v1483724188/ux8gg8d4wjfptoqk2oba.jpg'
    }, {
      id:3,
      url: 'https://res.cloudinary.com/derekww/image/upload/v1483680600/xsmxsjqx6z1jfh18yrcg.jpg'
    }, {
      id:4,
      url: 'https://res.cloudinary.com/derekww/image/upload/v1483723864/nl4oxt4jqzmj7vid6bm2.jpg'
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos));"
    );
  });
};
