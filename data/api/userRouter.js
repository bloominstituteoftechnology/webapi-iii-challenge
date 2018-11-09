const express = require('express');
const userDb = require('../helpers/userDb');

const router = express.Router();

const upperCase = require('../../middleware/upperCase');

router.get('/', (req, res) => {
  
  userDb
    .get()
    .then( users => {
      res.status(200).json({users});
    })
    .catch( error => {
      res
        .status(500)
        .json({ message : "Could not retrieve user info", error: error});
    });
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   userDb
//     .get(id)
//     .then(user => {
//        res.status(200).json(user) 
//     })
//     .catch( error => {
//       res.status(500).json({ message: "Could not retrieve user info", error: error})
//     })
// })

router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(user => {
       res.status(200).json(user) 
    })
    .catch( error => {
      res.status(500).json({ message: "Could not retrieve user info", error: error})
    })
})

router.post('/', upperCase, (req, res) => {
  userDb 
    .insert(req.body)
    .then((userData) => {
      res.status(201).json(userData);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not create post", error})
    })
})

router.put('/:id', upperCase, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDb
    .update(id, changes)
    .then((user) => {
      user
      ? res.status(200).json({ message: 'User updated successfully' })
      : res.status(404).json({ message: 'That user was not found or already updated' });
  })
  .catch((error) => {
    res.status(500).json({ message: 'error updating user', error });
  });
});



  router.delete('/:id', (req, res) => {
    const { id } = req.params
    userDb
      .remove(id)
      .then(count => {
        count
          ? res.status(200).json(count) 
          : res.status(404).json({ message: "The user with the specified ID does not exist."})
      })
      .catch( error => {
        res.status(500).json({ message: "The user could not be removed", error })
      })
  })

  module.exports = router;