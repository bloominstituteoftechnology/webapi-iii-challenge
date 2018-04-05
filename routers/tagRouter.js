const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');

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
  const tagsArray = [];

  db
    .get()
    .then(tags => {
      const lookingForTag = tags.filter(tag => tag.id === Number(id));
      if (lookingForTag[0]) {
        res.json(lookingForTag[0]);
      } else {
        console.log('error 1');
        res
          .status(404)
          .json({ message: 'The tag you are looking for, does not exist.' });
      }
    })
    .catch(error => {
      console.log('error 2');
      res.status(500).json(error);
    });
});

// something here and less than 128ch. no duplicates.
router.post('/', (req, res) => {
  const tag = req.body;
  const tagsList = [];
  db
    .get()
    .then(tags => {
      tags.forEach(tag => {
        tagsList.push(tag.tag);
      });
      if (!tag.tag) {
        res.status(400).json({ error: 'Tag Required' });
      } else if (tag.tag.length > 128) {
        res.status(400).json({ error: 'Max length 128 characters' });
      } else if (tagsList.includes(tag.tag)) {
        res.status(400).json({ error: 'Tag already exists' });
      } else {
        db
          .insert(tag)
          .then(tag => {
            res.json(tag);
          })
          .catch(error => {
            console.log('in the catch');
            res.status(500).json(error);
          });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;
  if (!tag.tag) {
    res.status(400).json({ error: 'Tag Required' });
  } else if (tag.tag.length > 128) {
    res.status(400).json({ error: 'Max length 128 characters' });
  } else {
    db
      .update(id, tag)
      .then(count => {
        if (count > 0) {
          db
            .get(id)
            .then(tag => {
              res.json(tag);
            })
            .catch(error => {
              res.status(500).json(error);
            });
        } else {
          res.status(404).json({ errorMessage: 'Tag not found' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(count => {
      if (count > 0) {
        db
          .get()
          .then(tag => {
            res.json(tag);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      } else {
        res.status(404).json({ errorMessage: 'Tag not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
