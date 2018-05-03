const express = require('express');

const db = require('../data/helpers/userDb');

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

// http://foo.com?search=bar&sort=asc
// req.query === { search: 'bar', sort: 'asc' }

// http://localhost:5000?id=1 // just to use req.query
// write it using an URL parameter instead /:id

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

router.get('/', (req, res) => {
  //get the users
  userDb
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({ error: err });
      // do something with the error
    });
});

// /123
router.get('/:id', (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  userDb
    .get(id)
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({ message: 'User Not Found' });
      } else {
        res.json(users);
      }
    })
    .catch(error => {
      // do something with the error
      res.status(500).json({ error: err });
    });
});

router.get('./:id/posts', (req, res) => {
  const { id } = req.params.id;
  
  userDb
    .getUserPosts(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;