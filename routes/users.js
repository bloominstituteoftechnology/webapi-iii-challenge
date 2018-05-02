const router = require('express').Router();

const db = require('../data/helpers/userDb');

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ msg: 'Please provide all required fields' });
      } else {
        res.status(500).json({ error: err });
      }
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(users[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;