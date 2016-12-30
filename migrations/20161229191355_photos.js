'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('photos', (table) => {
    table.increments();
    table.string('url').notNullable().defaultTo('http://maverickradio.com/wp-content/themes/fearless/images/missing-image-640x360.png');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('photos');
};
