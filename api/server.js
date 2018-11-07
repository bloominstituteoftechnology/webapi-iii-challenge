const express = require('express');
const cors = require('cors');
const user = require('../data/helpers/userDb');
const post = require('../data/helpers/postDb');
const tag = require('../data/helpers/tagDb');

const server = express();

server.use(express.json());
server.use(cors());

// user name to upper case
function toUpperCase(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
}

// sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'server go run' });
});

// routes for users
server.get('/api/users', (req, res) => {
  user
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({
        message: 'The user information could not be retrieved.',
        error: err
      })
    );
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  user
    .get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved.',
        error: err
      });
    });
});

server.delete('/api/users/:id', (req, res) => {
  user
    .remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your user could not be deleted', error: err })
    );
});

server.post('/api/users', toUpperCase, (req, res) => {
  user
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your user could not be added.', error: err })
    );
});

server.put('/api/users/:id', toUpperCase, (req, res) => {
  user
    .update(req.params.id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your user could not be updated.', error: err })
    );
});

// routes for posts
server.get('/api/posts', (req, res) => {
  post
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved.',
        error: err
      });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  post
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved.',
        error: err
      });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  post
    .remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your post could not be deleted', error: err })
    );
});

server.post('/api/posts', (req, res) => {
  post
    .insert(req.body)
    .then(success => res.status(201))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your post could not be added.', error: err })
    );
});

server.put('/api/posts/:id', (req, res) => {
  post
    .update(req.params.id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err =>
      res
        .status(400)
        .json({ message: 'Your post could not be updated.', error: err })
    );
});

// getUserPosts()
server.get('/api/posts/user/:id', (req, res) => {
  const { id } = req.params;
  user
    .getUserPosts(id)
    .then(list => {
      list.length > 0
        ? res.status(200).json(list)
        : res
            .status(404)
            .json({ Message: 'The user does not exist/has no posts.' });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: 'Posts for the specified user could not be retrieved.',
          error: err
        });
    });
});

module.exports = server;
