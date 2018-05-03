// yarn init -y
// yarn install
// npm i knex
// npm i sqlite3
// yarn add nodemon --dev

// import your node modules
const express = require('express');
// yarn add helmet -> npm i helmet
// const helmet = require('helmet');

const server = express();
// add your server code starting here

const db = require('./data/dbConfig.js');

