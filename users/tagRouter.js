const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(error => {
      res.status(500).json({ error: 'internal cant get' });
    });
});
router.post('/', (req, res) => {
  const tag = req.body;
  db
    .insert(tag)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;
  db
    .update(id, change)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedTag => {
          res.status(200).json(updatedTag);
        });
      } else {
        res.status(404).json(error);
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Cant update what is already updated' });
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
