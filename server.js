const express = require('express');

const server = express();

const helmet = require('helmet');

const cors = require('cors');

const userRouter = require('./data/Routers/user.js');


const logger = (req, res, next ) => {
    console.log("it worked fool ", req.params)

    next();
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

// server.use('/api/posts', postRouter);
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.send({ api: 'Running...' })
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));