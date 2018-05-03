const router = require('express').Router();

const db = require('../data/helpers/postDb');

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
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(post => {
      if (post === undefined) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(post);
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
        db.get(id).then(post => {
          res.status(200).json(post);
        });
      } else {
        res.status(404).json({ msg: 'User not found' });
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
        res.status(400).json({ msg: 'Unable to delete user.' });
      } else {
        res.status(200).json({ msg: 'User successfully deleted.' });
      }
    })
    .catch(err => {
      res.status(500).json({ erro: err });
    });
});

module.exports = router;