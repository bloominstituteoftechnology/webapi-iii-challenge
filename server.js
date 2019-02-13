const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan');
// const postRouter = require('./routes/Post-router');
const userRouter = require('./routes/User-router');
// const server = require('./server');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/users', userRouter);

server.listen(4000, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n');
  });

// module.exorts = server;