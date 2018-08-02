const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const cors = require('cors');

server.use(express.json());
server.use(cors());

// one user has many posts ex: instagram user
// one posts only has one user
// user has the posts and the posts has the tags
// each post can have many tags like hashtags on instagram

server.get('/posts', (req, res) => {
  postDb
    .get()
    .then((posts) => {
      res.json(posts);
    })
    .catch(() => {
      res.status(500).json({ err: 'The posts info cannot be found.' });
    });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then((post) => {
      if (post === 0) {
        res.status(404).json({ message: 'The post doesnt exist' });
      } else {
        res.json(post);
      }
    })
    .catch(() => {
      res.status(500).json({ err: 'The posts info cannot be found.' });
    });
});

// gets tags from the same posts
server.get('/posts/:id/tags', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then((post) => {
      if (post === 0) {
        res.status(404).json({ message: 'The post doesnt exist' });
      } else {
        postDb.getPostTags(id).then((tag) => {
          res.status(201).json(tag);
        });
      }
    })
    .catch(() => {
      res.status(500).json({ err: 'The posts info cannot be found.' });
    });
});

server.post('/posts', (req, res) => {
  const post = req.body;
  if (!post.userId || !post.text) {
    res.status(404).json({ errorMessage: 'Please provide user Id and text for the post.' });
  }
  postDb
    .insert(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error while saving the post to the database' });
    });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({ message: 'The post with this specified ID doesnt exist' });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'The post could not be deleted :('
      });
    });
});

// we're updating the post but who posted it doesn't change
server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!post.text) {
    res.status(404).json({ errorMessage: 'Please provide text for the post.' });
  }
  postDb
    .update(id, post)
    .then((id) => {
      if (id === 0) {
        res.status(404).json({
          message: 'The post with this ID does not exist :/'
        });
      }
      res.status(200).json(id);
    })
    .catch(() => {
      res.status(500).json({ error: 'The post information could not be updated :(' });
    });
});

server.get('/users', (req, res) => {
  userDb
    .get()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ err: 'The user information could not be found :(' });
    });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then((user) => {
      if (user === 0) {
        res.status(404).json({ message: 'The user doesnt exist' });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ err: 'The user info cannot be found.' });
    });
});

server.post('/users', (req, res) => {
  const user = req.body;
  if (!user.name) {
    res.status(404).json({ errorMessage: 'Please provide user name.' });
  }
  userDb
    .insert(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error while saving the user to the database' });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then((user) => {
      if (user === 0) {
        res.status(404).json({ message: 'The user with this specified ID doesnt exist' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'The user could not be deleted :('
      });
    });
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!user.name) {
    res.status(404).json({ errorMessage: 'Please provide a name.' });
  }
  userDb
    .update(id, user)
    .then((id) => {
      if (id === 0) {
        res.status(404).json({
          message: 'The user with this ID does not exist :/'
        });
      }
      res.status(200).json(id);
    })
    .catch(() => {
      res.status(500).json({ error: 'The user info could not be updated :(' });
    });
});

// gets all posts from the same user
server.get('/users/:id/posts', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then((user) => {
      if (user === 0) {
        res.status(404).json({ message: 'The user doesnt exist' });
      } else {
        userDb.getUserPosts(id).then((post) => {
          res.status(201).json(post);
        });
      }
    })
    .catch(() => {
      res.status(500).json({ err: 'The users info cannot be found.' });
    });
});

server.get('/tags', (req, res) => {
  tagDb
    .get()
    .then((tags) => {
      res.json(tags);
    })
    .catch(() => {
      res.status(500).json({ err: 'The tags info cannot be found.' });
    });
});

server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then((tag) => {
      if (tag === 0) {
        res.status(404).json({ message: 'The tag doesnt exist' });
      } else {
        res.json(tag);
      }
    })
    .catch(() => {
      res.status(500).json({ err: 'The tags info cannot be found.' });
    });
});

server.listen(5000, () => console.log('\n=== API running... ===\n'));
