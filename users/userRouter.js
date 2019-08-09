const express = require('express');
const router = express.Router();
const userDb = require('./userDb');
const postdb = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  postdb
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

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

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'error getting post' });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: 'User deleted' });
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDb
    .update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

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
