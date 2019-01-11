// routers are like mini applications
const express = require('express');
const db = require('../data/helpers/postDb.js');
const router = express.Router();

// middleware

// endpoints when url begins with /api/posts
router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// /api/posts/:id
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

// /api/posts
router.post('/', (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  db.insert(newPost)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

// /api/posts/:id
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

// /api/posts/:id
router.put('/:id', (req, res) => {
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
