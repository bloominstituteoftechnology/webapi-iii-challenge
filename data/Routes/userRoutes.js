const express = require('express');

const db = require('../helpers/userDb.js');

// create router, then rename all 'server.' to 'router.'
const router = express.Router();

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
    .then (count => {
      if (count === 1) res.json('successfully updated')
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  //get the users
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
      // do something with the error
    });
});

// /123
router.get('/:id', (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  db
    .get(id)
    .then(users => {
      // console.log(users);
      if (users === undefined) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(users);
      }
    })
    .catch(err => {
      // do something with the error
      res.status(500).json({ error: err });
    });
});

router.get('/posts/:id', (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  db
    .getUserPosts(id)
    .then(users => {
      // console.log(users);
      if (users === undefined) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(users);
      }
    })
    .catch(err => {
      // do something with the error
      res.status(500).json({ error: err });
    });
});

module.exports = router;
