const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const user = require('./data/helpers/userDb');
const postRouter = require('./routers/postRouter.js');
const port = 8000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));


function nameToUpperCase(req, res, next) {
    const { body } = req;
    if (!body.name.length) {
        res.status(400).json({ message: 'A name is required' })
    }
    req.body.name = body.name.toUpperCase();
    next();
}

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/posts', postRouter);

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
  
  server.post('/api/users', nameToUpperCase, async (req, res) => {
    console.log('body', req.body);
    try {
      const userData = req.body;
      const userId = await user.insert(userData);
      const users = await user.get(userId.id);
      res.status(201).json(users);
    } catch (error) {
      let message = 'error creating the user';
  
      if (error.errno === 19) {
        message = 'please provide both the name';
      }
  
      res.status(500).json({ message, error });
    }
  });

  server.put('/api/users/:id', nameToUpperCase, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    user.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res.status(404).json({ message: 'User not found' })
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting user', err });
    })
  });
  
  server.delete('/api/users/:id', (req, res) => {
    user.remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting user', err });
      });
  });


server.listen(port, () => console.log(`\nApi running on port ${port}\n`));