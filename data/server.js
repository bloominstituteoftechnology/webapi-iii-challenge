const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = rquire('cors');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
