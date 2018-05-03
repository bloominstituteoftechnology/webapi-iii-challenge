const router = require('express').Router();

const db = require('../data/helpers/tagDb');

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      if (err.errno === 1) {
        res.status(400).json({ msg: 'Please provide all required fields' });
      } else {
        res.status(500).json({ error: err });
      }
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(tags => {
      res.json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(tag => {
      if (tag === undefined) {
        res.status(404).json({ message: 'Tag not found' });
      } else {
        res.json(tag);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.put('/:id', function(req, res) {
  const id = req.params.id;
  db
    .update(id, req.body)
    .then(count => {
      if (count > 0) {
        db.get(id).then(tag => {
          res.status(200).json(tag);
        });
      } else {
        res.status(404).json({ msg: 'Tag not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', function(req, res) {
  const id = req.params.id;
  db
    .remove(id)
    .then(status => {
      if (status === 0) {
        res.status(400).json({ msg: 'Unable to delete tag.' });
      } else {
        res.status(200).json({ msg: 'Tag successfully deleted.' });
      }
    })
    .catch(err => {
      res.status(500).json({ erro: err });
    });
});

module.exports = router;