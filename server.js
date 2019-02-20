const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./data/router');

const server = express();

server.use(express.json(),logger('tiny'), cors(), helmet());
server.use('/api', router);

server.get('/', (req, res) => {
    res.send('Working Hard for that CONNECT!')
})



module.exports = server;

