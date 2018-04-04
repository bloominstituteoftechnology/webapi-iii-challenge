const express = require('express');
//const helmet = require('helmet');

const postsRoutes = require('./postsRoutes/postsRoutes.js');
const tagsRoutes = require('./tagsRoutes/tagsRoutes.js');
const usersRoutes = require('./usersRoutes/usersRoutes.js');

const server = express();

// custom middleware:

function logger(req, res, next) {
  console.log('body: ', req.body);
  
  next();
}

//server.use(helmet());
server.use(express.json());
server.use(logger);


// routers:

server.use('/api/posts', postsRoutes);
// server.use('/api/tags', tagsRoutes);
// server.use('/api/users', usersRoutes);


const port = 5000;
server.listen(port, () => console.log('server running on port 5000'));
