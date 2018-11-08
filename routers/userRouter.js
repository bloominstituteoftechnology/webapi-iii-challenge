const express = require('express');
const user = require('../data/helpers/userDb.js');
const nameToUpperCase = require('../middleware/UppercaseMW.js');

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.params;
    user.get(id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the users", error: err });
      });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    user.get(id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the user", error: err });
      });
  });

  router.get('/posts/:userId', (req, res) => {
    const { userId } = req.params;
    user.getUserPosts(userId)
      .then(usersPosts => {
        if (usersPosts === 0) {
          return errorHelper(404, 'No posts by that user', res);
        }
        res.json(usersPosts);
      })
      .catch(err => {
        res.status(500).json({ message: "could not find the user's post", err });
      });
  });
  
  router.post('/', nameToUpperCase, async (req, res) => {
    console.log('body', req.body);
    try {
      const userData = req.body;
      const userId = await user.insert(userData);
      const users = await user.get(userId.id);
      res.status(201).json(users);
    } catch (error) {
      let message = 'error creating the user';
  
      if (error.errno === 19) {
        message = 'please provide both the name';
      }
  
      res.status(500).json({ message, error });
    }
  });

  router.put('/:id', nameToUpperCase, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    user.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res.status(404).json({ message: 'User not found' })
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating the user', err });
    })
  });
  
  router.delete('/:id', (req, res) => {
    user.remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting user', err });
      });
  });

  module.exports = router;