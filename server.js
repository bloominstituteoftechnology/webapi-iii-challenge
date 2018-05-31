const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

server.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name for the user." });
  }
  else {
    users
      .insert({ name })
      .then(response => {
        users.get(response.id)
          .then(user => {
            res.status(201).json({ user });
          });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
      });
  }
});


server.get('/api/users', (req, res) => {
  users.get().then(users => {
    res.json({ users });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: "The user could not be retrieved." });
  });
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  users
    .get(id)
    .then(user => {
      if (user) {
        res.json({ user });
      }
      else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be retrieved." });
    })
});


server.put('/api/users/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name for the user." });
  }
  else {
    users
      .update(id, { name })
      .then(success => {
        if (success) {
          users.get(id)
            .then(user => {
              res.json({ user });
            });
        }
        else {
          res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
      })
  }
});


server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  let deletedUser;

  users.get(id)
    .then((user) => deletedUser = user);

  users
    .remove(id)
    .then(success => {
      if (success) {
        res.json({ deletedUser });
      }
      else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    })
});


server.post('/api/posts', (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    res.status(400).json({ errorMessage: "Please provide a user id and text for the post." });
  }
  else {
    posts
      .insert({ userId, text })
      .then(response => {
        posts.get(response.id)
          .then(post => {
            res.status(201).json({ post });
          });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the post to the database" });
      });
  }
});

server.get('/api/posts', (req, res) => {
  posts.get().then(post => {
    res.json({ post });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: "The post could not be retrieved." });
  });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  posts
    .get(id)
    .then(post => {
      if (post) {
        res.json({ post });
      }
      else {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The post could not be retrieved." });
    })
});

server.put('/api/posts/:id', (req, res) => {
  const { userId, text } = req.body;
  const id = req.params.id;
  if (!userId || !text) {
    res.status(400).json({ errorMessage: "Please provide a user id and text for the post." });
  }
  else {
    posts
      .update(id, { userId, text })
      .then(success => {
        if (success) {
          posts.get(id)
            .then(post => {
              res.json({ post });
            });
        }
        else {
          res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "The post could not be retrieved." });
      })
  }
});


server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  posts
    .remove(id)
    .then(success => {
      if (success) {
        res.json({ success });
      }
      else {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The post could not be removed" });
    })
});



server.listen(port, () => console.log(`Server running on port ${port}`));
