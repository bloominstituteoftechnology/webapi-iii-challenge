const express = require('express');
const routes = require('../routes/postRoutes.js');

module.exports = server =>{
    server.use(express.json());
    server.use('/api', routes);
}