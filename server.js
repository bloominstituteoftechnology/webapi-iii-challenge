const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const user = require('./data/helpers/userDb');
const port = 8000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/users', (req, res) => {
    const { id } = req.params;
    user.get(id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the users", error: err });
      });
  });
  
  server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    user.get(id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the user", error: err });
      });
  });

  server.get('/api/users/posts/:userId', (req, res) => {
    const { userId } = req.params;
    user.getUserPosts(userId)
      .then(usersPosts => {
        if (usersPosts === 0) {
          return errorHelper(404, 'No posts by that user', res);
        }
        res.json(usersPosts);
      })
      .catch(err => {
        res.status(500).json({ message: "could not find the user's post", err });
      });
  });
  



server.listen(port, () => console.log(`\nApi running on port ${port}\n`));