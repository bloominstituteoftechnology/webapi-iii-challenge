const express = require('express');
const router = express.Router();
const userDb = require('./userDb');

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
  userDb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'could not get users' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      console.log('user is...', user);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'ID not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (!body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  if (!body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
