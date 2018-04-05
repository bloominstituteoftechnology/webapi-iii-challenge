const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb');

router.get('/', (req,res) => {
  
  db.get().then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  
  db.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.post('/', (req, res) => {
  const user = req.body;

  db.insert(user)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(response => {
      user = { ...response[0] };

      db.remove(id)
        .then(response => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router;