const express = require('express');
// const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
// const userDb = require('./data/helpers/userDb');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./data/Routes/userRoute');
const postRoutes = require('./data/Routes/postRoute');
const tagRoutes = require('./data/Routes/tagRoute');



const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));









server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);























server.listen(9000, () => console.log("Api running here"));