const express = require('express');

const db = require('../helpers/postDb.js');
const userDb = require('../helpers/userDb.js');

// create router, then rename all 'server.' to 'router.'
const router = express.Router();

router.post('/', (req, res) => {
  body = req.body
  if (body && body.userId && body.text) {
    userDb
      .get(body.userId)
      .then(response => response.length === 0
        ? res.status(404).send(({ error: `No user found with id ${body.userId}` }))
        : db
          .insert(body)
          .then((response) => res.status(201).send(response))
          .catch(() => res.status(500).send({ error: 'Error creating post' })))
      .catch(() => res.status(500).send({ error: `Error finding user with id ${body.userId}` }))
  } else {
    res.status(400).send({ error: 'Please provide a valid userId and text for the post' })
  }
})


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

router.get('/tags/:id', (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  db
    .getPostTags(id)
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
