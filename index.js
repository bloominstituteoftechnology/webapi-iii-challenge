const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const PORT = 4020;

server.use(
    express.json(),
    helmet(),
    logger('tiny'),
    cors()
)











server.listen(PORT, () => {
    console.log('Server Listening...')
})