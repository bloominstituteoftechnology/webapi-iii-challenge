const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

module.exports = server => {
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    server.use(cors());
    server.use(logger('dev'));
    server.use(helmet());
}