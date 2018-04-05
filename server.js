const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./Routers/userRouter.js');
const postRouter = require('./Routers/postRouter.js');
const tagRouter = require('./Routers/tagRouter.js');


const server = express();

function logger(req, res, next) {
    console.log('body: ', req.body)
   next();
  }

  server.use(helmet());
  server.use(morgan('dev'));
  server.use(cors());
  server.use(express.json());
  server.use(logger);
  
  server.use('/api/users', userRouter);
  server.use('/api/posts', postRouter);
  server.use('/api/tags', tagRouter);
  
server.get('/', (req, res) => {
    res.json({ api: "Running..." });
})

const port = 5000;
server.listen(port, () => console.log("API is now running on localhost: 5000"));