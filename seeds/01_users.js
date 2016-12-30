/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        first_name: 'Adele',
        last_name: 'Rowling',
        username: 'rowling',
        email: 'jkrowling@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        profile_pic: 'http://res.cloudinary.com/derekww/image/upload/c_thumb,q_75,w_200/v1483065549/headshot_copy_weatds.jpg'
      }, {
        id: 2,
        first_name: 'Scooby',
        last_name: 'Doo',
        username: 'scooby',
        email: 'scoobydoo@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        profile_pic: 'http://res.cloudinary.com/derekww/image/upload/c_thumb,q_75,w_200/v1483065549/headshot_copy_weatds.jpg'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
