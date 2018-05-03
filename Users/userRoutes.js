const express = require('express');

const db = require('../data/db');

const router = express.Router();

// only cares about urls beginning with: /api/users
router.post('/', (req, res, next) => {
  const userInformation = req.body;
  console.log('user information', userInformation);

  db
    .insert(userInformation)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      logErrorToDatabase(err);

      next(err);
    });
  // .catch(err => {
  //   if (err.errno === 19) {
  //     res.status(400).json({ msg: 'Please provide all required fields' });
  //   } else {
  //     res.status(500).json({ erro: err });
  //   }
  // });
});

router.get('/', (req, res) => {
  //get the users
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
      // do something with the error
    });
});

router.get('/search', function(req, res) {
  res.send('inside /api/users/search');
});

// /123
router.get('/:id', (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  db
    .findById(id)
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(users[0]);
      }
    })
    .catch(err => {
      // do something with the error
      res.status(500).json({ error: err });
    });
});

router.delete('/', function(req, res) {
  const { id } = req.query;
  let user;
  db
    .findById(id)
    .then(foundUser => {
      user = { ...foundUser[0] };

      db.remove(id).then(response => {
        res.status(200).json(user);
      });
    })
    .catch(err => {
      res.status(500).json({ erro: err });
    });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(users => {
          res.status(200).json(users[0]);
        });
      } else {
        res.status(404).json({ msg: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;