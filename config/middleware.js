const express = require('express');
const routes = require('../routes/postRoutes.js');
const helmet = require('helmet');

module.exports = server =>{
    server.use(express.json());
    server.use('/api', routes);
    server.user(helmet());
}