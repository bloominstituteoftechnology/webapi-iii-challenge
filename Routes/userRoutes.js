const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb');

router.get('/', (req, res) => {
  db
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(user => {
      if (user !== undefined) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "A user with that specific ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res) => {
  const userInfo = req.body;

  db
    .insert(userInfo)
    .then(response => {
      db
        .get(response.id)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res.status(404).json({ message: "A user with that specific ID does not exist." });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(response => {
      db
        .get(id)
        .then(user => {
          if (user !== undefined) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: "A user with the specific ID does not exist." });
          }
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let user;

  db
    .get(id)
    .then(foundUser => {
      if (foundUser !== undefined) {
        user = foundUser;
        console.log(foundUser);
        db
          .remove(id)
          .then(response => {
            res.status(200).json(user);
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(404).json({ message: "A user with that specific ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;