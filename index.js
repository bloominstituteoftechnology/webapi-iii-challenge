//Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('./routers/usersRouter.js');
const postsRouter = require('./routers/postsRouter.js');

const server = express();
const PORT = process.env.PORT || 4500;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

//User Endpoints

//Post Endpoints

//Listening
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});