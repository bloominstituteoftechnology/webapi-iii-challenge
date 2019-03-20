// server setup;
const express = require('express');
const server = express();
server.use(express.json());
const port = 4000;

// MIDDLEWARE
const logger = require('morgan');  // logging;
const helmet = require('helmet'); //  security;
const cors = require('cors');  // react calls;
server.use(cors());


// import server, db
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
