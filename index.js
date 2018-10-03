// IMPORTS
const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// MIDDLEWARE
const upperCaser = (req, res, next) => {
  req.name = req.body.name.toUpperCase();
  next();
}

// USERS ROUTE HANDLERS
server.route('/users')
  .post(upperCaser, (req, res) => {
    const { name } = req;
    const newUser = { name };
      if (!name) return res.status(400).json({ errorMessage: "Please provide a user name." });
      userDb.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: "There was an error while saving the user to the database" }));
  })
  .get((req, res) => {
    userDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The request for users could not be retrieved." }));
  })

  server.route('/users/:id')
    .get((req, res) => {
      const { id } = req.params;
      userDb.get(id)
        .then(user => {
          if (!user) return res.status(404).json({ message: "The user with the specified ID does not exist." });
          return res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }));
    })
    .put(upperCaser, (req, res) => {
      const { id } = req.params;
      const { name } = req;
      const editedUser = { name }
      userDb.update(id, editedUser)
        .then(updatedUser => {
          if (!updatedUser) return res.status(404).json({ message: "The user with the specified ID does not exist." });
          if (!name) return res.status(400).json({ errorMessage: "Please provide a name for the user." });
          return res.status(200).json(updatedUser);
        })
        .catch(err => res.status(500).json({ error: "The user information could not be modified." }));
    })
    .delete((req,res) => {
      const { id } = req.params;
      userDb.remove(id)
        .then(removedUser => {
          if (!removedUser) return res.status(404).json({ message: "The user with the specified ID does not exist." });
          return res.status(202).json(removedUser)
        })
        .catch(err => res.status(500).json({ error: "The user could not be removed." }));
    })

  server.route('/users/:id/posts')
  .get((req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
      .then(userPosts => {
        if (!userPosts.length) return res.status(404).json({ message: "The user with the specified ID does not exist." });
        return res.status(200).json(userPosts);
      })
      .catch(err => res.status(500).json({ error: "The user posts could not be retrieved." }));
  })
// POSTS ROUTE HANDLERS
server.route('/posts')
  .post((req, res) => {
    const { userId, text } = req.body;
    const newPost = { userId, text };
      if (!userId) return res.status(400).json({ errorMessage: "Please provide a user id." });
      postDb.insert(newPost)
        .then(newPost => res.status(201).json(newPost))
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
  })
  .get((req, res) => {
    postDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The request for posts could not be retrieved." }));
  })

server.route('/posts/:id')
  .delete((req, res) => {
    const { id } = req.params;
    postDb.remove(id)
      .then(removedPost => {
        if (!removedPost) return res.status(404).json({ message: "The post with the specified ID does not exist." });
        return res.status(202).json(removedPost)
      })
      .catch(err => res.status(500).json({ error: "The post could not be removed." }));
  })

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))