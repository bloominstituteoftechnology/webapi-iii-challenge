//Imports

const express = require('express');

const helmet = require('helmet');

const morgan = require('morgan');

const cors = require('cors');

const userRouter = require('./routers/userRouter.js');

const tagRouter = require('./routers/tagRouter.js');

const postRouter = require('./routers/postRouter.js');

const bodyParser = require('body-parser');

const server = express();

//Custom Middleware

const logger = (req, res, next) => {
    console.log(`URL requested:${req.url}`);
    console.log(`Body Info:${req.body}`);
    next();
}

server.use(express.json());

server.use(helmet());

server.use(cors());

server.use(morgan('dev'));

server.use(logger);

server.use(bodyParser.json());

server.use('/api/posts/', postRouter);

server.use('/api/tags', tagRouter);

server.use('/api/users/', userRouter);

const port = 5000;

server.listen(port, () => console.log(`API running on localhost:${port}`))