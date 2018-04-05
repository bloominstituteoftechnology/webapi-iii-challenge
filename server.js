const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const db = require('./data/db.js');

const server = express();

const db = require('/date/db.js')

//middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());