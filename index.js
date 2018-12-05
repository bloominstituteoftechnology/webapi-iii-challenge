const express = require('express');
const morgan = require('morgan');
const db = require('./data/dbConfig.js');


const server = express();
const PORT = 3000;

server.use(morgan('dev'));

server.listen(PORT, err => {
    console.log(`Server listening on port ${PORT}`);
});