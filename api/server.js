const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require("../data/helpers/userDb.js");
const upperCase = require("../middleware/upperCase.js");
const userRouter = require('../users/userRouter.js');

const server = express();

server.use(express.json()); // built in
server.use(helmet()); // third party
server.use(morgan('short')); // third party
// server.use(upperCase);


server.use('/', userRouter);

module.exports = server;

