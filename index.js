const express = require('express');
const db = {
  users: require('./data/helpers/userDb'),
  posts: require('./data/helpers/postDb'),
  tags: require('./data/helpers/tagDb')
};
const app = express();

/* Middleware */

app.use(express.json());

const validateUser = (req, res, next) => {
  let { name } = req.body;
  if (!req.body || !name) {
    res.status(404).json({ error: 'User must have a name.' });
  } else {
    name = name[0].toUpperCase() + name.slice(1);
    next();
  }
};

const validatePost = (req, res, next) => {
  if (!req.body || !req.body.text) {
    res.status(404).json({ error: 'Post must have some text.' });
  } else if (!req.body.userId) {
    res.status(404).json({ error: 'No user found with the id for that post.' });
  } else {
    next();
  }
};

const validateTag = (req, res, next) => {
  if (!req.body || !req.body.tag) {
    res.status(404).json({ error: 'Tag must have some text.' });
  } else {
    next();
  }
};

/* Users DB requests */

const fetchUsers = (req, res) => {
  db.users.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting users.' });
    });
};

app.get('/api/users', fetchUsers);

app.get('/api/users/:id', (req, res) => {
  db.users.get(req.params.id)
    .then(user => {
      if (!user) res.status(404).json({ error: 'No user was found with the specified id.' });
      else res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the user.' });
    });
});

app.get('/api/users/:id/posts', (req, res) => {
  db.users.getUserPosts(req.params.id)
    .then(posts => {
      if (!posts) res.status(404).json({ error: 'No associated posts were found for the specified user.' });
      else res.status(200).json(posts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting posts for the specified user.' });
    });
});

app.delete('/api/users/:id', (req, res) => {
  db.users.remove(req.params.id)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No user was found with the specified id.' });
      else fetchUsers(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the user.' });
    });
});

app.post('/api/users', validateUser, (req, res) => {
  db.users.insert(req.body)
    .then(() => fetchUsers(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding the user.' });
    });
});

app.put('/api/users/:id', validateUser, (req, res) => {
  db.users.update(req.params.id, req.body)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No user was found with the specified id.' });
      else fetchUsers(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error updating the user.' });
    });
});

/* Posts DB requests */

const fetchPosts = (req, res) => {
  db.posts.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting posts.' });
    });
};

app.get('/api/posts', fetchPosts);

app.get('/api/posts/:postId', (req, res) => {
  db.posts.get(req.params.postId)
    .then(post => {
      if (!post) res.status(404).json({ error: 'No post was found with the specified id.' });
      else res.status(200).json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the post.' });
    });
});

app.get('/api/posts/:postId/tags', (req, res) => {
  db.posts.getPostTags(req.params.postId)
    .then(tags => {
      if (!tags) res.status(404).json({ error: 'No associated tags were found for the specified post.' });
      else res.status(200).json(tags);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting tags for the specified post.' });
    })
});

app.delete('/api/posts/:postId', (req, res) => {
  db.posts.remove(req.params.postId)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No post was found with the specified id.' });
      else fetchPosts(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the post.' });
    });
});

app.post('/api/posts', validatePost, (req, res) => {
  db.posts.insert(req.body)
    .then(() => fetchPosts(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding post.' });
    });
});

app.put('/api/posts/:postId', validatePost, (req, res) => {
  db.posts.update(req.params.postId, req.body)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No post was found with the specified id.' });
      else fetchPosts(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error updating the post.' });
    });
});

/* Tags DB requests */

const fetchTags = (req, res) => {
  db.tags.get()
    .then(tags => res.status(200).json(tags))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting tags.' });
    });
};

app.get('/api/tags', fetchTags);

app.get('/api/tags/:tagId', (req, res) => {
  db.tags.get(req.params.tagId)
    .then(tag => {
      if (!tag) res.status(404).json({ error: 'No tag was found with the specified id.' });
      else res.status(200).json(tag);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the tag.' });
    });
});

app.delete('/api/tags/:tagId', (req, res) => {
  db.tags.remove(req.params.tagId)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No tag was found with the specified id.' });
      else fetchPosts(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the tag.' });
    });
});

app.post('/api/tags', validateTag, (req, res) => {
  db.tags.insert(req.body)
    .then(() => fetchTags(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding tag.' });
    });
});

app.put('/api/tags/:tagId', validateTag, (req, res) => {
  db.tags.update(req.params.tagId, req.body)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No tag was found with the specified id.' });
      else fetchTags(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error updating tag.' });
    });
});

app.listen(5000, () => console.log('Server listening on port 5000.'));
