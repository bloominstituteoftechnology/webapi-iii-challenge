const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const tagRouter = require('./tags/tagRouter.js');

const server = express();

// custom middleware [m1, m2, mn] -> [request handlers]
function logger(req, res, next) {
    if(req.url === '/api/tags/'){
        console.log('tags: ', req.url);
    }
    
    // next points to the next middleware
    next();
}
server.use(logger);



// middleware
// server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));