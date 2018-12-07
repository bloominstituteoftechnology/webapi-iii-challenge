const express = require('express');
const router = express.Router();
const dbUsers = require('./data/helpers/userDb');
const MW = require('./middleware');

router.get('/', (req, res) => {
  dbUsers
    .get()
    .then(users => users.length ? res.json(users) : res.json({ message: "We don't have any user for you right now, please try again later!" }))
    .catch(err => res.status(500).json({ error: 'We have an unexpected error while retrieving your users!' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbUsers
    .get(id)
    .then(user => user ? res.json(user) : res.status(404).json({ error: 'There is no user with the specified ID!' }))
    .catch(err => res.status(500).json({ error: 'We have an unexpected error while retrieving your user!' }));
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  dbUsers
    .getUserPosts(id)
    .then(userPosts => userPosts.length ? res.json(userPosts) : res.json({ message: 'This user has no post yet!' }))
    .catch(err => res.status(500).json({ error: "Something went wrong retrieving your user's posts" }));
});

router.post('', MW.toTitleCase, (req, res) => {
  const { name } = req.body;
  if (!name) { res.status(400).json({ error: 'Add a valid Name!' }) }
  dbUsers
    .insert({ name })
    .then(idInfo => dbUsers.get(idInfo.id).then(user => res.status(201).json(user)))
    .catch(err => res.status(500).json({ error: 'Something went wrong trying to add the new user!' }));
});

router.put('/:id', MW.toTitleCase, (req, res) => {
  const { id } = req.params;
  const user = req.body;
  dbUsers
    .update(id, user)
    .then(count => count ? dbUsers.get(id).then(user => res.json(user))
      : res.status(404).json({ error: 'There is no user with the specified ID!' }))
    .catch(err => res.status(500).json({ error: "Something went wrong updating your user's info" }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbUsers
    .remove(id)
    .then(count => count ? res.json({ message: 'User successfully deleted!' })
      : res.status(404).json({ error: "We couldn't find any user with th specified ID!" }))
    .catch(err => res.status(500).json({ error: 'Something went wrong deleting that user!' }));
});

module.exports = router;