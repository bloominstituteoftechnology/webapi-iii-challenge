const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb');

const customMiddleware = require('../custom_middleware');

//retrieves a list of users
router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({message: 'Could not find any users'})
    })
});

//retrieves a list of posts from a user
router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDb.getUserPosts(id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: `Couldn't retrieve posts`})
    })
});

//creates a user
router.post('/', customMiddleware.uppercaseMiddleware, (req, res) => {
  const user = req.body;

  if (user.name) {
    userDb.insert(user)
      .then(userId => {
        res.json(userId)
      })
      .catch(err => {
        res
          .status(500)
          .json({error: `Couldn't add user`})
      })
  } else {
    res
      .status(400)
      .json({errorMessage: 'Please include a username'})
  }
});

//deletes a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  userDb.remove(id)
    .then(count => {
      if (count) {
        res
          .json({message: 'Successfully deleted'})
      } else {
        res
          .status(404)
          .json({message: 'The user with the specified ID does not exist'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({error: 'User could not be removed'})
    })
});

//updates a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (user.name) {
    userDb.update(id, user)
      .then(count => {
        if (count) {
          res.json({message: 'Successfully updated'})
        } else {
          res
            .status(404)
            .json({message: 'The user with the specified ID does not exist'})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({error: 'User could not updated'})
      })
  } else {
    res
      .status(400)
      .json({errorMessage: 'Please provide a username to update'})
  }
})

module.exports = router;