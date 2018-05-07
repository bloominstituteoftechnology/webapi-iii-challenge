const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb');

router.get('/', (req, res) => {
  db
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(tag => {
      if (tag !== undefined) {
        res.status(200).json(tag);
      } else {
        res.status(404).json({ message: "A tag with that specific ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res) => {
  const tagInfo = req.body;

  db
    .insert(tagInfo)
    .then(response => {
      db
        .get(response.id)
        .then(tag => {
          res.status(201).json(tag);
        })
        .catch(err => {
          res.status(404).json({ message: "A tag with that specific ID does not exist." });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(response => {
      db
        .get(id)
        .then(tag => {
          if (tag !== undefined) {
            res.status(200).json(tag);
          } else {
            res.status(404).json({ message: "A tag with that specific ID does not exist" });
          }
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let tag;

  db
    .get(id)
    .then(foundTag => {
      tag = foundTag;
      db
        .remove(id)
        .then(response => {
          res.status(200).json(tag);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(404).json({ message: "A tag with that specific ID does not exist." });
    });
});

module.exports = router;