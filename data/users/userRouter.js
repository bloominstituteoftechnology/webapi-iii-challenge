const express = require('express');
const router = express.Router();
const db = require('../helpers/userDb.js');

// middleware

// endpoints
router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res
        .status(200)
        .json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Something went wrong...", err })
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(user => {
      if (user) {
        res 
          .status(200)
          .json(user)
      } else {
        res
          .status(404)
          .json({ message: "There is no user with that id number..."})
      }
    })
});

router.post('/', async (req, res) => {
  const user = req.body;
  if(user.name !== "") {
    try {
      const userId = await db.insert(user);
      res
        .status(201)
        .json(userId) 
    } catch (error) {
      res
        .status(500)
        .json({ error: "There was an error creating user..."})
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please enter user name!" })
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res
          .status(200)
          .send(count);
      } else {
        res
          .status(404)
          .json({ message: "Cannot edit a user that doesn't exist..." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: 'error updating user on server!', error });
    })
});

module.exports = router;