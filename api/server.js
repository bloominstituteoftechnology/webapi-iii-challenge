const express = require('express');
const knex = require('knex');
const sqlite3 = require('sqlite3');

const server = express();

server.use(express.json());
server.use(knex());
server.use(sqlite3());