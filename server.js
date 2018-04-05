const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const db = require('./data/dbConfig.js');

const server = express();



//middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));