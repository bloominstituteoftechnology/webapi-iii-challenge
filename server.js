const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./routers/userRouter.js');
const tagRouter = require('./routers/tagRouter.js');
const postRouter = require('./routers/postRouter.js');

const server = express();

// custom middleware

function logger(req, res, next) {

  console.log('body: ', req.body);


  next();
}

// middleware
server.use(morgan('dev'))
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

// use cors on port
server.use(cors({
  origin: 'http://localhost:3000'
}));

server.use('/api/users', userRouter);
server.use('/api/tags', tagRouter);
server.use('/api/posts', postRouter);

server.get('/', function (req, res) {
  res.json({
    api: 'Running...'
  });
});

const port = 5000;
server.listen(port, () => console.log(`API Running on ${port}`));