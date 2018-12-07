const express = require('express');
const router = express.Router();
const userDB = require('./data/helpers/userDb');

router.get('/', (req, res) => {
  userDB.get()
    .then(users => {
      res.json(users)
        .catch(err => {
          res.status(500).json({ error: "problem loading users" })
        })
    })
})


router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDB.get(id)
    .then(user => {
      if (user) {
        res.json(user);
      }
      else {
        res.status(404).json({ message: "user does not exist" })
      }
    })
})

router.post('/', (req, res) => {
  const user = req.body;

  if (user.name) {
    userDB.insert(user)
      .then((user) => {
        res.json(user)
          .catch(err => {
            res.status(500).json({ message: "failed to insert user" })
          })
      });
  } else {
    res.status(400).json({ error: "missing name" })
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  userDB.update(id, user)
    .then(count => {
      if (count) {
        userDB.get(id).then(user => res.json(user))
      }
      else {
        res.status(500).json({ error: "failed to update user" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "failed to update user" })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userDB.remove(id)
    .then(count => {
      if (count) {
        res.json({ message: "deleted user" })
      }
      else {
        res.status(404).json({ error: "user does not exist in the system" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "error deleting user" })
    })
});





module.exports = router;