const router = require('express').Router();
const db = require('../data/helpers/tagDb');

/* Middleware */

const validateTag = (req, res, next) => {
  if (!req.body || !req.body.tag) {
    res.status(404).json({ error: 'Tag must have some text.' });
  } else {
    next();
  }
};

/* Tags DB requests */

const fetchTags = (req, res) => {
  db.get()
    .then(tags => res.status(200).json(tags))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting tags.' });
    });
};

router.get('/', fetchTags);

router.get('/:tagId', (req, res) => {
  db.get(req.params.tagId)
    .then(tag => {
      if (!tag) res.status(404).json({ error: 'No tag was found with the specified id.' });
      else res.status(200).json(tag);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the tag.' });
    });
});

router.delete('/:tagId', (req, res) => {
  db.remove(req.params.tagId)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No tag was found with the specified id.' });
      else fetchPosts(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the tag.' });
    });
});

router.post('/', validateTag, (req, res) => {
  db.insert(req.body)
    .then(() => fetchTags(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding tag.' });
    });
});

router.put('/:tagId', validateTag, (req, res) => {
  db.update(req.params.tagId, req.body)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No tag was found with the specified id.' });
      else fetchTags(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error updating tag.' });
    });
});

module.exports = router;
