const express = require('express');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const uppercase = require('../uppercase/uppercaseMiddleware');

const server = express();
// --MIDDLEWARE--
server.use(express.json());


// --USER ENDPOINTS--
server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find users', err });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find user', err });
    });
});

server.get('/api/users/:id/posts', (req, res) => {
  const userId = req.params.id;
  userDb
    .getUserPosts(userId)
    .then((userPosts) => res.status(200).json({ userPosts }))
    .catch((err) => {
      res.status(500).json({ message: 'no posts by this user', err });
    });
});

server.post('/api/users', uppercase, (req, res) => {
  const user = req.body;
  userDb
    .insert(user)
    .then((id) => {
      userDb.get(id.id).then((userById) => {
        console.log('ID', id);
        console.log('USERBYID', userById);
        res.status(200).json({ userById });
      });
    })
    .catch((err) => {
      let message = 'error creating user';
      if (err.errno === 19) {
        message = 'please provied a username';
      }
      res.status(400).json({ message, err });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDb
    .update(id, changes)
    .then((count) => {
      if (count) {
        res
          .status(200)
          .json({ message: `${count} users updated successfully` });
      } else {
        res
          .status(404)
          .json({ message: 'the user with the id does not exist' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the user could not be updated', err });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `${count} users deleted successfuly` });
      } else {
        res
          .status(404)
          .json({ message: 'the user with the id does not exist' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the user could not be removed', err });
    });
});

// --POST ENDPOINTS--
server.get('/api/posts', (req, res) => {
  postDb
    .get()
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find posts', err });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then((post) => res.status(200).json({ post }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find post', err });
    });
});

server.get('/api/posts/:id/tags', (req, res) => {
  const postId = req.params.id;
  postDb
    .getPostTags(postId)
    .then((postTags) => res.status(200).json({ postTags }))
    .catch((err) => {
      res.status(500).json({ message: 'no tags on this post', err });
    });
});

server.post('/api/posts', (req, res) => {
  const post = req.body;
  postDb
    .insert(post)
    .then((id) => {
      postDb.get(id.id).then((postById) => {
        res.status(200).json({ postById });
      });
    })
    .catch((err) => {
      let message = 'error creating post';
      if (err.erno === 19) {
        message = 'please provide a user id and a post body';
      }
      res.status(400).json({ message, err });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDb
    .update(id, changes)
    .then((count) => {
      if (count) {
        res
          .status(200)
          .json({ message: `${count} posts updated successfully` });
      } else {
        res
          .status(404)
          .json({ message: 'the post the that id does not exist' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the post could not be updated', err });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then((count) => {
      if (count) {
        res
          .status(200)
          .json({ message: `${count} posts deleted successfully` });
      } else {
        res
          .status(404)
          .json({ message: 'the post with that id does not exist', err });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'the post could not be removed', err });
    });
});

// --EXPORT--
module.exports = server;
