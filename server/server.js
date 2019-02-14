// code away!
const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes/userRouter');

const postRouter = require('./routes/postRoutes/postsRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', async (req, res) => {
	res.send(`
    <h2>Lambda User API</h>
    <p>Welcome to the Lambda User API</p>
  `);
});

// export default server; ES2015 Modules
module.exports = server;
