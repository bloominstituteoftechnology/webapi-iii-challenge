const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');

//endpoint for /api/tags/

//GET REQUEST
router.get('/', (req, res) => {
  db
    .get()
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The tags could not be retrieved' });
    });
});

router.get('/:tagId/', (req, res) => {
  const { tagId } = req.params;

  db
    .get(tagId)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The tags could not be retrieved' });
    });
});

// // //GET DELETE

router.delete('/:tagId', (req, res) => {
  const { tagId } = req.params;

  db
    .remove(tagId)
    .then((tag) => {
      if (tag > 0) {
        res.status(200).json({ message: 'Tag deleted successfully!' });
      } else {
        res.status(404).json({ error: 'Tag not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The Tag could not be retrieved' });
    });
});

// // //GET POST

router.post('/', (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({ errorMessage: 'Tag is required' });
    return;
  }

  db
    .insert({ tag })
    .then((tag) => {
      res.status(201).json({ message: 'Created a new tag successfully ' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'The new tag could not be created' });
    });
});

// // //GET PUT

router.put('/:tagId', (req, res) => {
  const { tagId } = req.params;
  const updatedTag = req.body;

  db
    .update(tagId, updatedTag)
    .then((updates) => {
      res.status(200).json(updatedTag);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The tag could not be updated' });
    });
  // res.json({q:2});
});

module.exports = router;
