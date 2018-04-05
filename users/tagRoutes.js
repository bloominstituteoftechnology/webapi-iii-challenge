const express = require('express');

const router = express.Router();

const tagDb = require('../data/helpers/tagDb.js');

// READ tags
router.get('/', (req, res) => {
  tagDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ tag by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// CREATE tag
router.post('/', (req, res) => {
  const { id } = req.params;
  const tag = req.body;
  tagDb
    .insert(tag)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE tag
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;
  tagDb
    .update(id, tag)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE tag
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;
  tagDb
    .remove(id)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
