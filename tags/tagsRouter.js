const express = require('express');

const router = express.Router();

const tagDb = require('../data/helpers/tagDb.js');

// /api/tags
router.get('/', (req, res) => {
  tagDb
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  tagDb
    .insert(req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  tagDb
    .update(id, update)
    .then(count => {
      if (count > 0) {
        tagDb
          .get(id)
          .then(tag => {
            res.status(200).json(tag[0]);
          })
          .catch();
      } else {
        res.status(404).json({ message: 'tag at that id doesnt exist' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(response => {
      tag = { ...response[0] };
      tagDb
        .remove(id)
        .then(response => {
          res.status(200).json(tag);
        })
        .catch(error => {
          res.status(404).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
