//import all dependency's here:
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagsDb = require('./data/helpers/tagDb');
const userRoute = require('./userRoute');

const port = 5000;
const server = express();

// "start": "nodemon server.js --exec babel-node --presets es2015,stage-2"
// create custom middleware here:


// apply middleware here:
server.use(helmet());
server.use(cors());
server.use(express.json());

// add route handlers:
server.use('/api/users', userRoute);

// create route handlers here:

// server.post('/api/users', (req, res) => {
//   const {name} = req.body;
//   userDb.insert(name)
//     .then(obj => {
//       userDb.get(obj.id)
//         .then(user => {
//           res.json(user);
//         })
//     })
// })
server.get('/api/posts', (req, res) => {
  postsDb.get()
    .then(posts => {
      res.json(posts);
    });
})
server.get('/api/tags/', (req, res) => {
  tagsDb.get()
    .then(tags => {
      res.json(tags);
    })
})
server.listen(port, () => {
  console.dir(`server listening on port ${port}`);
})
