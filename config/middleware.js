const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const users = require('../users/users.js');


module.exports = (server) => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('short'));
    server.use(users);
}