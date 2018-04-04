const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');

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

server.use('/api/users', userRouter);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));