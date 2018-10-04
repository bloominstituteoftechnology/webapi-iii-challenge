const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const port = 6000;
const helmet = require('helmet');

// SERVER SETUP
const server = express();
server.use(express.json());
server.use(helmet());

// MIDDLEWARE
const upperCase = (req, res, next) => {
  req.name = req.body.name.toUpperCase();
  next();
};

// USERS ROUTE HANDLERS
server
  .route('/users')
  .post(upperCase, (req, res) => {
    const { name } = req.name;
    const newUser = { name };
    if (!name)
      return res
        .status(400)
        .json({ errorMessage: 'Please provide a user name.' });
    userDb
      .insert(newUser)
      .then(user => res.status(201).json(user))
      .catch(() =>
        res.status(500).json({ error: 'Error while saving the user.' })
      );
  })
  .get((req, res) => {
    userDb
      .get()
      .then(data => res.status(200).json(data))
      .catch(() =>
        res
          .status(500)
          .json({ error: 'The requested users could not be retrieved.' })
      );
  });

server
  .route('/users/:id')
  .get((req, res) => {
    const { id } = req.params;
    userDb
      .get(id)
      .then(user => {
        if (!user)
          return res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        return res.status(200).json(user);
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: 'The user information could not be retrieved.' })
      );
  })
  .put(upperCase, (req, res) => {
    const { id } = req.params;
    const { name } = req.name;
    const editedUser = { name };
    userDb
      .update(id, editedUser)
      .then(updatedUser => {
        if (!updatedUser)
          return res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        if (!name)
          return res
            .status(400)
            .json({ errorMessage: 'Please provide a name for the user.' });
        return res.status(200).json(updatedUser);
      })
      .catch(() =>
        res.status(500).json({ error: 'The user info could not be updated.' })
      );
  })
  .delete((req, res) => {
    const { id } = req.params;
    userDb
      .remove(id)
      .then(removedUser => {
        if (!removedUser)
          return res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        return res.status(202).json(removedUser);
      })
      .catch(() =>
        res.status(500).json({ error: 'This user could not be removed.' })
      );
  });

server.route('/users/:id/posts').get((req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(userPosts => {
      if (!userPosts.length)
        return res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      return res.status(200).json(userPosts);
    })
    .catch(() =>
      res.status(500).json({ error: 'The user posts could not be retrieved.' })
    );
});

// POSTS ROUTE HANDLERS
server
  .route('/posts')
  .post((req, res) => {
    const { userId, text } = req.body;
    const newPost = { userId, text };
    if (!userId)
      return res
        .status(400)
        .json({ errorMessage: 'Please provide a user id.' });
    if (!text)
      return res
        .status(400)
        .json({ errorMessage: 'Please provide some text.' });
    userDb
      .get(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        } else {
          postDb
            .insert(newPost)
            .then(newPost => res.status(201).json(newPost))
            .catch(() =>
              res.status(500).json({
                error:
                  'There was an error while saving the post to the database'
              })
            );
        }
      })
      .catch(() =>
        res.status(500).json({
          error: 'There was an error while finding the user in the database'
        })
      );
  })
  .get((req, res) => {
    postDb
      .get()
      .then(data => res.status(200).json(data))
      .catch(() =>
        res
          .status(500)
          .json({ error: 'The request for posts could not be retrieved.' })
      );
  });

server
  .route('/posts/:id')
  .put((req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    const editedPost = { userId, text };
    postDb
      .update(id, editedPost)
      .then(updatedPost => {
        if (!updatedPost)
          return res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        if (!userId)
          return res
            .status(400)
            .json({ errorMessage: 'Please provide a userId for the user.' });
        return res.status(200).json(updatedPost);
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: 'The post information could not be modified.' })
      );
  })
  .delete((req, res) => {
    const { id } = req.params;
    postDb
      .remove(id)
      .then(removedPost => {
        if (!removedPost)
          return res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        return res.status(202).json(removedPost);
      })
      .catch(() =>
        res.status(500).json({ error: 'The post could not be removed.' })
      );
  });

// PORT LISTENERS
server.listen(port, () => console.log(`Server is running on ${port}!`));
