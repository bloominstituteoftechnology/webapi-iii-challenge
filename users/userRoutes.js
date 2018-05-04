const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const user = req.body;
  userDb
    .insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  if (!name) {
    return res.status(400).json({errorMessage: "Please provide a name for the user."})
  }
  userDb
    .update(id, name)
    .then(name => {
      if (name === 0) {
        res.status(404).json({message: 'The user with the specified ID does not exist.'});
      }
      userDb
      .get(id)
      .then(updatedName => {
        res.status(200).json(updatedName);
      })
    })
    .catch(error => {
      res.status(500).json({ error: "The user's information could not be modified"})
    })
});

module.exports = router;