'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('garden_posts', (table) => {
    table.increments();
    table.integer('garden_id').notNullable().references('id').inTable('gardens');
    table.integer('post_id').notNullable().references('id').inTable('posts');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('garden_posts');
};
