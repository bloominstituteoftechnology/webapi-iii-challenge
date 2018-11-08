//dependencies
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');


//the server, using the dependencies. 
const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

//bringing in the routes
const userRoute = require('./data/routes/userRoute');
const postRoute = require('./data/routes/postRoute')
const tagRoute = require('./data/routes/tagRoute');


//using the routes. 
server.use('/users', userRoute);
server.use('/posts', postRoute)
server.use('/tags', tagRoute),

    //exporting the server.
    module.exports = server;