const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

// handles routes that start with: /api/users

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

router.get('/:id/orders', (req, res) => {
  res.send(`viewing orders for user with id ${req.params.id}`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    // .findById(userid)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const user = req.body;
  db
    .insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database',
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let user;

  db
    .get(id)
    .then(response => {
      user = { ...response };

      db
        .remove(id)
        .then(response => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedUsers => {
          res.status(200).json(updatedUsers);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
