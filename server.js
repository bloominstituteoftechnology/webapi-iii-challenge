const express = require('express');

const userDb = require('./users/userDb')

const postDb = require('./posts/postDb')

const userRouter = require('./users/userRouter');

const validateUserId = require('./users/userRouter');

const validateUser = require('./users/userRouter');

const validatePost = require('./users/userRouter');

const server = express();

server.use(express.json());

server.use(logger);

server.use(validateUserId);

server.use(validateUser);

server.use(validatePost);

server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// server.post('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

// route handlers
// server.get('/', (req, res) => {
//   res.status(200).json({ api: 'up' });
// });

// server.post('/users', (req, res) => {
//   res.status(201).json(req.body)
// })

// server.post('/users', (req, res) => {
//   console.log('post name',req.body)
//       // if(!(req.body.name))
//       // {
//       //     res.status(400).json({errorMessage: "Please provide name for the post." })
//       // }
//       // else
//       {
//       userDb.insert(req.body.name)
//           .then(response => {
//               res.status(201).json(req.url);
//           })
//           .catch(error => {
//               res.status(500).json({ message: 'error adding to list of names'})
//           })
//         }    
//   });
  
//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

module.exports = server;
