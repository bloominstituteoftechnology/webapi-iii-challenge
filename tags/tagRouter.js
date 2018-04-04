const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb');

// handles routes that start with: /api/tags
router.get('/', (req, res) => {
    db
      .get()
      .then(tags => {
        res.json(tags);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db
      .findById(id)
      .then(tags => {
        res.json(tags[0]);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post('/', (req, res) => {
    const tag = req.body;
    db
      .insert(tag)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let tag;
  
    db
      .findById(id)
      .then(response => {
        user = { ...response[0] };
  
        db
          .remove(id)
          .then(response => {
            res.status(200).json(tag);
          })
          .catch(error => {
            res.status(500).json(error);
          });
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
      .then(count => {
        if (count > 0) {
          db.findById(id).then(updatedTags => {
            res.status(200).json(updatedTags[0]);
          });
        } else {
          res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  module.exports = router;