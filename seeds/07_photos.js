/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('photos').del()
  .then(() => {
    return knex('photos').insert([{
      id: 1,
      url: 'http://images.meredith.com/content/dam/bhg/Images/2007/07/BHG115876.jpg.rendition.largest.550.jpg',
    }, {
      id:2,
      url: 'https://s-media-cache-ak0.pinimg.com/736x/0f/b1/25/0fb12570954ea903a243605c7336da5a.jpg'
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos));"
    );
  });
};
