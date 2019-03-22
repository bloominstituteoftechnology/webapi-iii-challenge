const express = require('express'); // importing a CommonJS module

const userRouter = require('./router/userrouter');
const postRouter = require('./router/postrouter');

const helmet = require('helmet');

const morgan = require('morgan');

const server = express();


function logger(req,res,next){
  console.log(new Date(), req.method,req.url);
  next ();
}


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/blogs', userRouter);
server.use('/api/post', postRouter);


server.get('/', async (req, res) => {
  res.send(`
    <h2>Lambda blog API</h2>
    <p>Welcome to the Lambda Blogs API</p>
    `);
});

module.exports = server;
