const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());

server.listen(8000, () => { console.log('Listening on Port 8000')});
