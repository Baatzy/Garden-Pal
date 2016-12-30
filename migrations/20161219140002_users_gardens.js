'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users_gardens', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('garden_id').notNullable().references('id').inTable('gardens');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_gardens');
};
