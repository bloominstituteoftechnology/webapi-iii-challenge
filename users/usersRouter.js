const express = require('express');

// database
const userDb = require('../data/helpers/userDb');

const router = express.Router();

const setToUpperCase = (req, _, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}

// ================ ENDPOINTS ================

// GET /api/users
router.get('/', (_, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    })
});

// GET user by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  userDb.get(id)
    .then(user => {
      console.log('GET user by ID:', user)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "User Not Found" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error })
    })
});

// GET user's posts
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  userDb.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: error })
    })
});

// CREATE a new user
router.post('/', setToUpperCase, (req, res) => {
  const user = req.body;
  const { name } = user;
  console.log('POST req.body:', user);

  if (!name) {
    res.status(400).json({ message: "Name required" })
  }

  userDb.insert(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    })
});

// UPDATE an existing user
router.put('/:id', setToUpperCase, (req, res) => {
  const { id } = req.params;
  const user = req.body;

  userDb.update(id, user)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} user(s) updated` });
      } else {
        res.status(404).json({ message: "user ID does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    })
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  userDb.remove(id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} user(s) deleted` });
      } else {
        res.status(404).json({ message: "user ID does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error })
    })
});

module.exports = router;
