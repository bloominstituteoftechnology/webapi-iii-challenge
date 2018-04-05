const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  db
    .get(req.params.id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// something here and less than 128ch. no duplicates.
router.post('/', (req, res) => {
  const user = req.body;
  console.log(user);
  const usersList = [];
  db
    .get()
    .then(users => {
      users.forEach(user => {
        usersList.push(user.name);
      });
      if (!user.name) {
        res.status(400).json({ error: 'Name Required' });
      } else if (user.name.length > 128) {
        res.status(400).json({ error: 'Max length 128 characters' });
      } else if (usersList.includes(user.name)) {
        res.status(400).json({ error: 'User already exists' });
      } else {
        db
          .insert(user)
          .then(user => {
            res.json(user);
          })
          .catch(error => {
            console.log('in the catch');
            res.status(500).json(error);
          });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

router.get('/:id/posts', (req, res) => {
  db
    .getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts.map(post => post.text));
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
