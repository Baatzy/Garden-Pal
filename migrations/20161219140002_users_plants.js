'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users_plants', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('plant_id').notNullable().references('id').inTable('plants');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_plants');
};
