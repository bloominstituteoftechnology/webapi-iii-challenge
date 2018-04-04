const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const server = express();

server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
server.use(bodyParser.json());
server.use('/api/users/', userRouter);
server.use('/api/posts', postRouter);


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));