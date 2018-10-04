const express = require('express');
const router = express.Router();
const userDB = require('../data/helpers/userDb');

const formatUserName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}; // middleware that takes the body's name and converts it to uppercase

router.get('/', (req, res) => {
  userDB.get()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
}); // return all users

router.get('/:id', (req, res) => {
  userDB.get(req.params.id)
    .then(user => {
      if (!user) { return res.json({ message: `no user by that id` }) }
      res.json(user);
    })
    .catch(err => console.log(err));
}); // supply user ID, recieve user object

router.get('/posts/:id', (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
}); // supply user ID, recieve user posts

router.post('/', formatUserName, (req, res) => {
  if (!req.body.name) { return res.json({ message: `need name` }) }
  if (req.body.name.length > 128 && req.body.name.length < 5) { return res.json({ message: `username needs to be between 5 and 128 characters` }) }
  userDB.insert(req.body)
    .then(({ id }) => res.json({ message: `Good job, returned ID ${id}` }))
    .catch(err => console.log(err));
}); // add username, recieve new ID

router.put('/:id', formatUserName, (req, res) => {
  if (!req.body.name) { return res.json({ message: `need name` }) }
  if (req.body.name.length > 128 && req.body.name.length < 5) { return res.json({ message: `username needs to be between 5 and 128 characters` }) }
  userDB.update(req.params.id, req.body)
    .then(count => {
      if (!count) { return res.json({ message: `no user by that id` }) }
      res.json({ message: `Way to go, returned count ${count}` })
    })
    .catch(err => console.log(err));
}); // update username, recieve updated count

router.delete('/:id', (req, res) => {
  userDB.remove(req.params.id)
    .then(removed => {
      if (!removed) { return res.json({ message: `Error: No user by ID ${req.params.id} ` }) }
      res.json({ message: `Success: ${req.params.id} was deleted. Count ${removed} username.` })
    })
    .catch(err => console.log(err));
}) // delete user, recieve deleted count

module.exports = router;