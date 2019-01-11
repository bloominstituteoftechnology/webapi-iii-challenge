// routers are like mini applications
const express = require('express');
const db = require('../data/helpers/userDb.js');
const validateUserName = require('../common/validateUserNameMiddleware.js');
const router = express.Router();

// middleware

// endpoints when url begins with /api/users
router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// /api/users/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

// /api/users/:id/posts
router.get('/:id/posts', (req, res) => {
  const id = req.params.id;

  db.getUserPosts(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

// /api/users
router.post('/', validateUserName, (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  db.insert(newUser)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

// /api/users/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(user => {
      if (user) {
        db.remove(id).then(count => {
          res.status(200).json(user);
        });
      } else {
        res
          .status(404)
          .json({ error: 'The user with the specific ID does not exist' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

// /api/users/:id
router.put('/:id', validateUserName, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.get(id)
    .then(user => {
      if (user) {
        db.update(id, changes)
          .then(result => res.status(200).json(result))
          .catch(err => res.status(500).json({ error: err }));
      } else {
        res
          .status(404)
          .json({ error: 'The user with the specific ID does not exist' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
