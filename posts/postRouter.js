const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb');

router.get('/', (req, res) => {
  db
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id/tags', (req, res) => {
  const { id } = req.params;

  db
    .getPostTags(id)
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id/delete', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(response => {
      user = { ...response[0] };

      db
        .remove(id)
        .then(posts => {
          res.status(200).json(posts);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
