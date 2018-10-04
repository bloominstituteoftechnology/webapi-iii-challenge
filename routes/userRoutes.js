const express = require('express');

const router = express.Router();

router.get('/api/users/:id', (req, res) => {
  userDB.get(req.params.id)
    .then(user => {
      if (!user) { return res.json({ message: `no user by that id` }) }
      res.json(user);
    })
    .catch(err => console.log(err));
}); // supply user ID, recieve user object

router.get('/api/users/posts/:id', (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
}); // supply user ID, recieve user posts

router.post('/api/users', formatUserName, (req, res) => {
  if (!req.body.name) { return res.json({ message: `need name` }) }
  if (req.body.name.length > 128 && req.body.name.length < 8) { return res.json({ message: `username needs to be between 8 and 128 characters` }) }
  userDB.insert(req.body)
    .then(({ id }) => res.json({ message: `Good job, returned ID ${id}` }))
    .catch(err => console.log(err));
}); // add username, recieve new ID

router.put('/api/users/:id', formatUserName, (req, res) => {
  if (!req.body.name) { return res.json({ message: `need name` }) }
  if (req.body.name.length > 128 && req.body.name.length < 8) { return res.json({ message: `username needs to be between 8 and 128 characters` }) }
  userDB.update(req.params.id, req.body)
    .then(count => {
      if (!count) { return res.json({ message: `no user by that id` }) }
      res.json({ message: `Way to go, returned count ${count}` })
    })
    .catch(err => console.log(err));
}); // update username, recieve updated count

router.delete('/api/users/:id', (req, res) => {
  userDB.remove(req.params.id)
    .then(removed => {
      if (!removed) { return res.json({ message: `Error: No user by ID ${req.params.id} ` }) }
      res.json({ message: `Success: ${req.params.id} was deleted. Count ${removed} username.` })
    })
    .catch(err => console.log(err));
}) // delete user, recieve deleted count