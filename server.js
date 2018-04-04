const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');
//const postRouter = require('./users/userRouter.js');
//const tagRouter = require('./users/userRouter.js');

const server = express();

// custom middleware [m1, m2, mn] -> [request handlers]
function logger(req, res, next) {
    console.log('url: ', req.url);
    if(req.url === '/api/users/:id/orders'){
        console.log('body: ', req.body);
    }
    
    // next points to the next middleware
    next();
}

// middleware
// server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
//server.use('/api/posts', userRouter);
//server.use('/api/tags', userRouter);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));