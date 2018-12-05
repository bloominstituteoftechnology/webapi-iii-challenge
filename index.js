const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

const PORT = 4000;

server.use(
    express.json(),
    helmet(),
    logger('dev'),
)

//endpoints

//listener

server.listen(PORT, () => {
    console.log('server is running')
})