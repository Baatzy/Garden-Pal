'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('match_type', (table) => {
    table.increments();
    table.string('type').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('match_type');
};
