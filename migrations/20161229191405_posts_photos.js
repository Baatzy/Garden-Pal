'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('posts_photos', (table) => {
    table.increments();
    table.integer('post_id').notNullable().references('id').inTable('posts');
    table.integer('photo_id').notNullable().references('id').inTable('photos');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts_photos');
};
