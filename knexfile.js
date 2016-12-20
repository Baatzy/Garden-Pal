'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/plants'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
