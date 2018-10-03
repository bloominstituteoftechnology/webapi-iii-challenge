const router = require('express').Router();
const db = require('../data/helpers/userDb');

/* Middleware */

const validateUser = (req, res, next) => {
  let { name } = req.body;
  if (!req.body || !name) {
    res.status(404).json({ error: 'User must have a name.' });
  } else {
    name = name[0].toUpperCase() + name.slice(1);
    next();
  }
};

/* Users DB requests */

const fetchUsers = (req, res) => {
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting users.' });
    });
};

router.get('/', fetchUsers);

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(user => {
      if (!user) res.status(404).json({ error: 'No user was found with the specified id.' });
      else res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the user.' });
    });
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      if (!posts) res.status(404).json({ error: 'No associated posts were found for the specified user.' });
      else res.status(200).json(posts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting posts for the specified user.' });
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No user was found with the specified id.' });
      else fetchUsers(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the user.' });
    });
});

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(() => fetchUsers(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding the user.' });
    });
});

router.put('/:id', validateUser, (req, res) => {
  db.update(req.params.id, req.body)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No user was found with the specified id.' });
      else fetchUsers(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error updating the user.' });
    });
});

module.exports = router;
