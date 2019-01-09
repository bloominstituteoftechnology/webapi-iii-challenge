const express = require('express');
const morgan = require('morgan');


const server = express();

// middleware

server.use(express.json()); //built-in
server.use(morgan('short')); // logging middleware

server.use(doubler);

function doubler(req, res, next) {
    const value = req.body.number || 0;

    req.double=value * 2

    next();
}

// routes
server.get('/', (req, res) => {
    res.send('server alive');
});

module.exports = server;