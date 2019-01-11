const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = server => {
    server.use(helmet());
    server.use(morgan('short'));
    server.use(express.json());
    server.use(cors());
};