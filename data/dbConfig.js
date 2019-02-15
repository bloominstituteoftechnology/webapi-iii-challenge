const knex = require('knex');

const knexConfig = require('../knexfile.js')[db];

const db = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig);
