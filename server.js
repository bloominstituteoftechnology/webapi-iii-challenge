const express = require('express');

const server = express();

const helmet = require('helmet');

const cors = require('cors');

const usersRouter = require('./data/Routers/user.js');
const postsRouter = require('./data/Routers/post.js');
const tagsRouter = require('./data/Routers/tag.js');


const logger = (req, res, next ) => {
    console.log("it worked fool ", req.params)

    next();
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter)
server.use('/api/tags', tagsRouter)

server.get('/', (req, res) => {
    res.send({ api: 'Running...' })
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));