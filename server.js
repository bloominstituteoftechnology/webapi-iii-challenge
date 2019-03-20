const server = require('express')();

server.use(require('express').json());

const postRouter = require('./data/helpers/postRouter')
const userRouter = require('./data/helpers/userRouter')

server.use('/api/posts', postRouter)
server.use('/api/user', userRouter)


server.get('/', (req, res) => {
    // Sanity Check
    res.send('Server Home directory GET is active.');
  });
  
  module.exports = server;