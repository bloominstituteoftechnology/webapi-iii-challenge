const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(error => console.error(error));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(tag => res.status(200).json(tag))
    .catch(error => console.error(error));
});

router.post('/', (req, res) => {
  const { tag } = req.body;
  if (tag === undefined || typeof tag !== 'string' || tag.length > 80) {
    res
      .status(400)
      .json({ error: 'Tag field is required. (string, 80 characters max)' });
  }

  db
    .get()
    .then((tags) => {
      tags.forEach((el) => {
        if (el.tag === tag)
          res.status(400).json({ error: 'Unique tag required.' });
      });
    })
    .catch(error => res.status(500).json({ error: 'Could not locate tag in database' }));

  db
    .insert({ tag })
    .then(newId =>
      res
        .status(201)
        .json({ message: `New tag, ${tag}, added with id ${newId.id}` })
    )
    .catch(error => console.error(error));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;

  db
    .update(id, tag)
    .then((updates) => {
      if (updates === 0) {
        res.status(404).json({ error: `Tag with id ${id} not found.` })
      }
      if (updates === 1) {
        res.status(200).json({ success: `Tag with id ${id} updated.` })
      }
    })
    .catch(error => console.error(error));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .remove(id)
    .then((deletions) => {
      if (deletions === 1) {
        res.status(200).json({ message: `Tag with id ${id} deleted.` });
      } else {
        res.status(400).json({ error: `Tag with id ${id} not deleted (not found).` });
      }
    })
    .catch(error => console.error(error));
});

module.exports = router;
