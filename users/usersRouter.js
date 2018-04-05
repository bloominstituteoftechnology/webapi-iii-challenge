const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  db
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.post('/', (req, res) => {
  const name = req.body;
  db
    .insert(name)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error saving name to database.' });
    });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;
  db
    .update(id, change)
    .then(count => {
      if (count > 0) {
        db.get(id).then(changedName => {
          res.status(200).json(changedName);
        });
      } else {
        res.status(404).json({ message: 'Could not get specified name.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let user;
  db.get(id).then(response => {
    user = { ...response };

    db
      .remove(id)
      .then(response => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  });
});

//for .get() res.json(users)
module.exports = router;
