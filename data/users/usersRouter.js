const express = require('express');

const Users = require('../helpers/userDb');

const router = express.Router();

//************************** GET ALL USERS *************************/
router.get('/', async (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot retrieve User List.' });
    });
});

//************************** GET SPECIFIC USER *************************/
router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The User information could not be retrieved.' });
    });
});

//************************** ADD NEW USER *************************/
router.post('/', (req, res) => {
  const { name } = req.body;
  const newUser = { name };

  if (!name) {
    return res
      .status(417)
      .json({ errorMessage: 'Please insert a name for this user.' });
  }

  Users.insert(newUser)
    .then(user => {
      res.status(200).json({ newUser, user });
    })
    .catch(err => {
      res.status(500).json({ error: 'The User could not be saved.' });
    });
});

//************************** UPDATE USER *************************/
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  const updateUser = { name };

  Users.update(userId, updateUser)
    .then(updatedUser => {
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else if (!req.body) {
        res
          .status(417)
          .json({ errorMessage: 'Please insert a name for this user.' });
      } else {
        res.status(200).json({ message: 'User updated', updatedUser });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be modified.' });
    });
});

//************************** DELETE USER *************************/
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
  
    Users.remove(userId)
      .then(deleted => {
        if (!deleted) {
          res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' });
        } else {
          res.status(200).json({ message: 'User Deleted!', deleted });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The user could not be deleted.' });
      });
  });
  

module.exports = router;
