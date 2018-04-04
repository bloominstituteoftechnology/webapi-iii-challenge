const express = require('express');

const tagsRouter = express.Router();

const db = require('../data/helpers/tagDb.js');

tagsRouter.get('/', (req, res) => {
  db
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

tagsRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

tagsRouter.post('/', (req, res) => {
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

tagsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  let tag;

  db
    .get(id)
    .then(response => {
      tag = { ...response[0] };

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

tagsRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedTags => {
          res.status(200).json(updatedTags);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The tag with that ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = tagsRouter;