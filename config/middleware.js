const express = require('express');
const helmet = require ('helmet');
const cors = require('cors');
const logger = require('morgan');


module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(logger(`combined`));
    server.use(cors());
};
