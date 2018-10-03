// Middleware
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Server helpers
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');

// Server init
const server = express();
server.use(logger('combined'));
server.use(cors());
server.use(express.json());

/// User Routes ///

// GET request to root
server.get('/', (req, res) => {
  res.send('Successfully made GET request to root');
});

// GET request to pull up all users
server.get( '/users', (req, res) => {
  userdb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

// GET request to pull up a specific user by ID
server.get('/users/:id', (req, res) => {
  userdb
    .get(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});

// POST request to create new user
server.post("/users", (req, res) => {
  const newUser = req.body;
  userdb
    .insert(newUser)
    .then(user => {
      userdb
        .get(user.id)
        .then(userExists => res.status(200).send(userExists))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// PUT to edit an existing user
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = { name, id };
  
  userdb
    .update(id, user)
    .then(editedUser => {
      userdb
        .get(id)
        .then(existingUserConfirmed => res.status(200).send(existingUserConfirmed))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

// DELETE request to delete a specific user
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userdb
    .remove(id)
    .then(user =>
      res.status(200).send(`User # ${id} successfuly deleted.`)
    )
    .catch(err => res.status(500).send(err));
});

///////

/// Post Routes ////

// GET all posts from server
server.get("/posts", (req, res) => {
  postdb
    .get()
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(500).send(err));
});

// GET a specific post by id
server.get("/posts/:id", (req, res) => {
  postdb
    .get(req.params.id)
    .then(post => res.status(200).send(post))
    .catch(err => res.status(500).send(err));
});

// POST a new post 
server.post("/posts", (req, res) => {

  const { text, userId } = req.body;
  const newPost = { text, userId };
  
  postdb
    .insert(newPost)
    .then(post => {
      postdb
        .get(post.id)
        .then(newPostConfirmed => res.status(200).send(newPostConfirmed))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });

});

// PUT to edit an existing post
server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const post = { text, userId };

  postdb.update(id, post).then(updatedPost =>
    postdb
      .get(id)
      .then(editedPostConfirmed => res.status(200).send(editedPostConfirmed))
      .catch(err => res.status(500).send(err))
  )
  .catch(err => res.status(500).send(err));
});

// DELETE a specific post by id
server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postdb.remove(id)
    .then(post => res.status(200).send(`Post # ${id} successfully removed.`))
    .catch(err => res.status(500).send(err));
});

///////

// Port listening
const port = 5000;
server.listen(port, () => console.log(`Server is listening to port ${port}`)); 