const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// const userRouter = require('./users/userRoutes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));
