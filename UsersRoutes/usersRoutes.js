// USERS ROUTE HANDLERS
const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb.js');
const upperCase = require('../Middleware/middleware.js').upperCase;

router
  .route('/')
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
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        })
      );
  })
  .get((req, res) => {
    userDb
      .get()
      .then(data => res.status(200).json(data))
      .catch(() =>
        res
          .status(500)
          .json({ error: 'The request for users could not be retrieved.' })
      );
  });

router
  .route('/:id')
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
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' })
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
        res.status(500).json({ error: 'The user could not be removed.' })
      );
  });

router.route('/:id/posts').get((req, res) => {
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

module.exports = router;
