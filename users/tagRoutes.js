const express = require('express');

const router = express.Router();

const tagDb = require('../data/helpers/tagDb.js');

// Get all posts
router.get('/', (req, res) => {
  tagDb
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


// Get posts by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Insert tag
router.post('/', (req, res) => {
  const tag = req.body;

  tagDb
    .insert(tag)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

// delete a tag -- working, but not returning the user that was deleted
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  tagDb
    .remove(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// update a user's name
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;

  if (!tag) {
    return res.status(400).json({errorMessage: "Please provide a name for the user."})
  }
  tagDb
    .update(id, tag)
    .then(tag => {
      if (tag === 0) {
        res.status(404).json({message: 'The user with the specified ID does not exist.'});
      }
      tagDb
      .get(id)
      .then(updatedTag => {
        res.status(200).json(updatedTag);
      })
    })
    .catch(error => {
      res.status(500).json({ error: "The user's information could not be modified"})
    })
});


module.exports = router;