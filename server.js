/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

const server = express();
exports.server = server;
server.use(express.json());
server.use(cors());

function upCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err, res.status(500).json({ error: 'Error getting users from database' }));
    });
});
server.get('/api/users/:id', (req, res) => {
  dbUsers
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error loading posts.', err });
    });
});

server.get('/api/users/:id', (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => {
      !user ? res.status(404).json({ message: 'ID not found.' }) : res.status(200).json(user);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'Error accessing database.' });
    });
});

server.post('/api/users', upCase, (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ errorMessage: 'Please provide a name' });
  }

  userDb
    .insert(req.body)
    .then(obj => {
      res.status(201).json({ name: req.body.name });
      console.log(`Added with ${obj.id} given id`);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'Error inserting user into database' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => {
      !user
        ? res.status(404).json({ message: 'ID not found.' })
        : userDb.remove(req.params.id).then(count => {
            if (count > 0) {
              res.status(200).json({ success: 'User has been deleted.' });
            }
          });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'Error deleting user from the database.' });
    });
});

server.put('/api/users/:id', upCase, (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ message: 'Please provide a new name.' });
  }
  userDb
    .get(req.params.id)
    .then(user => {
      !user
        ? res.status(404).json({ errorMessage: 'ID not found' })
        : userDb.update(req.params.id, req.body).then(count => {
            if (count === 1) {
              res.status(200).json({ name: req.body.name });
            }
          });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'There was an error updating the user.' });
    });
});

server.get('/api/posts', (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'Error getting posts from database.' });
    });
});

server.get('/api/post/:id', (req, res) => {
  postDb
    .get(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json({ errorMessage: 'ID not found' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'An error occurred while attempting to retrieve the post from the database.' });
    });
});

server.get('/api/posts/tags/:id', (req, res) => {
  postDb
    .getPostTags(req.params.id)
    .then(tags => {
      res.status(200).json({ tags });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting post tags', err });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  postDb.get(req.params.id).then(post => {
    !post
      ? res.status(404).json({ errorMessage: 'ID not found' })
      : postDb.remove(req.params.id).then(count => {
          if (count > 0) {
            res.status(200).json({ success: 'User has been deleted.' });
          }
        });
  });
});

server.put('/api/posts/:id', (req, res) => {
  postDb
    .update(req.params.id, req.body)
    .then(count => {
      res.status(400).json({ count });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error updating post', err });
    });
});

server.post('/api/posts', async (req, res) => {
  const postData = req.body;
  if (!postData.text || !postData.userId) {
    res.status(404).json({ message: 'That post does not exist' });
  } else {
    try {
      const newPostId = await postDb.insert(postData);
      const newPost = await postDb.get(newPostId.id);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'There was an error creating a new post.' });
    }
  }
});
server.listen(9000, () => {
  console.log('Running on port 9000');
});
