const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting posts.' });
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/:id/tags', (req, res) => {
  const { id } = req.params;
  db
    .getPostTags(id)
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const quote = req.body;
  db
    .insert(quote)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: 'Youre not doing it right' });
    });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;
  db
    .update(id, change)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedText => {
          res.status(200).json(updatedText);
        });
      } else {
        res.status(404).json({ message: 'could not get specified post.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let post;
  db
    .get(id)
    .then(response => {
      post = { ...response };
      db
        .remove(id)
        .then(response => {
          res.status(200).json(post);
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
