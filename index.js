// Node Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();

server.use(cors(), morgan('combined'), helmet());

port = 9999;
server.listen(port, () => {console.log(`-=-=-=- Node Blog Server Active on Port ${port} -=-=-=-`)});