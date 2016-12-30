'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.text('content').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
