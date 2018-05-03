const express = require('express');
const helmet = require('helmet'); // 1 yarn add helment || npm i helmet // 2

const userRoutes = require('./data/Routes/userRoutes');
const tagRoutes = require('./data/Routes/tagRoutes');
const postRoutes = require('./data/Routes/postRoutes');


const server = express();
// client -> [error, m1, post, m3] -> [rh1, rh2]

function upperCase(tags) {
  return (req, res, tags) => {
    tags.forEach( tag => tag.toUpperCase());
  }
  next();
}

// function logger(msg) {
//   return function(req, res, next) {
//     console.log(`\n= ${msg}: ${req.url}`);

//     next();
//   };
// }

function errorHandler(err, req, res, next) {
  if (err) {
    // check the type of error and react to it
    if (err.errno === 19) {
      res.status(400).json({ msg: 'Please provide all required fields' });
    } else {
      res.status(500).json({ error: 'something bad happened' });
    }
  }
}

// add middleware
// server.use(greeter('NAME'));
// server.use(logger('loading'));
server.use(helmet()); // 3
server.use(express.json());

// user route handlers
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', upperCase(), tagRoutes);

server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

// ALWAYS EXECUTE ERROR HANDLER @ END SO ALL MISSED ERRORS ABOVE ARE CAUGHT
server.use(errorHandler);

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));