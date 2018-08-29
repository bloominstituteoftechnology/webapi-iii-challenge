const express = require('express');
const db = {
  posts: require('./data/helpers/postDb'),
  users: require('./data/helpers/userDb')
};
const app = express();

/* Middleware */

app.use(express.json());

const capitalUser = (req, res, next) => {
  let { name } = req.body;
  if (!req.body || !name) {
    res.status(404).json({ error: 'User must have a name.' });
  } else {
    name = name[0].toUpperCase() + name.slice(1);
    next();
  }
};

/* DB requests */

const fetchUsers = (req, res) => {
  db.users.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the users.' });
    });
};

app.get('/users', fetchUsers);

app.get('/users/:id', (req, res) => {
  db.users.get(req.params.id)
    .then(user => {
      if (!user) res.status(404).json({ error: 'No user with the specified id.' })
      else res.status(200).json(user)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting the user.' });
    });
});

app.delete('/users/:id', (req, res) => {
  db.users.remove(req.params.id)
    .then(() => fetchUsers(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the user.' });
    })
});

app.post('/users', capitalUser, (req, res) => {
  db.users.insert(req.body)
    .then(() => fetchUsers(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding the user.' });
    })
});

app.put('/users/:id', capitalUser, (req, res) => {
  db.users.update(req.params.id, req.body)
  .then(() => fetchUsers(req, res))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Error updating the user.' });
  })
});

app.listen(5000, () => console.log('Server listening on port 5000.'));
