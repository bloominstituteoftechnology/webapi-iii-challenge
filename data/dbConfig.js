const knex = require('knex');
// const knexConfig = require('../knexfile.js');
const db = process.env.DB_ENV || "development";
const config = require('../knexfile.js')[db];

module.exports = knex(config);
