const express = require('express');
const CORS = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routerUser = require('./users/routerUser');
const routerPost = require('./posts/routerPost');
const routerTag = require('./tags/routerTag');

const server = express();

// middleware use
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use(CORS());
server.use('/api/users', routerUser)
server.use('/api/posts', routerPost)
server.use('/api/tags/', routerTag)

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'))