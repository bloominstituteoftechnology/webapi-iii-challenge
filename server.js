const express = require('express');
const userDb = require('./data/helpers/userDb.js');


const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//import routers
const postsRouter = require('./data/routers/postsRouter.js');
const usersRouter = require('./data/routers/usersRouter.js');
const tagsRouter = require('./data/routers/tagsRouter.js');

const server = express();

server.use(express.json());

server.use('/posts', postsRouter);
server.use('/users', usersRouter);
server.use('/tags', tagsRouter);

server.get('/', (req, res) => {
    res.json({api: 'running'});
});

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));
