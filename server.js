// import your node modules
const cors = require('cors');
const postDb = require('./data/helpers/postDb');
const tabDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const dbConfig = require('./data/dbConfig.js')
const express = require('express');
const helmet = require('helmet');
const port = 5000;
const server = express();

const userRouter = require('./RouteHandlers/userRouter');
const tagRouter = require('./RouteHandlers/tagRouter');
const postRouter = require('./RouteHandlers/postRouter');

//Middleware
server.use(helmet());
server.use(express.json());


// Routes
server.use('/api/users', userRouter);
server.use('/api/tags', tagRouter);
server.use('/api/posts', postRouter);


server.listen(5000, () => console.log('Listening!'))