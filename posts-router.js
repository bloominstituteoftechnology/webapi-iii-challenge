const express = require('express');
const router = express.Router();
const dbPosts = require('./data/helpers/postDb');

router.get('/', (req, res) => {
  dbPosts
    .get()
    .then(posts => posts.length ? res.json(posts) : res.json({ message: "We don't have any post for you right now, please try again later!" }))
    .catch(err => res.status(500).json({ error: 'We have an unexpected error while retrieving your posts!' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbPosts
    .get(id)
    .then(post => post ? res.json(post) : res.status(404).json({ error: 'There is no post with the specified ID' }))
    .catch(err => res.status(500).json({ error: 'Something went wrong retrieving your post!' }));
});

router.post('/', (req, res) => {
  const post = req.body;
  dbPosts
    .insert(post)
    .then(idInfo => dbPosts.get(idInfo.id).then(post => post ? res.json(post)
      : res.status(404).json({ error: 'There is no post with the specified ID' })))
    .catch(err => res.status(500).json({ error: 'Something went wrong adding your post!' }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  dbPosts
    .update(id, post)
    .then(count => count ? dbPosts.get(id).then(post => res.json(post))
      : res.status(404).json({ error: 'There is no post with the specified ID!' }))
    .catch(err => res.status(500).json({ error: "Something went wrong updating your post's info" }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbPosts
    .remove(id)
    .then(count => count ? res.json({ message: 'Post successfully deleted!' })
      : res.status(404).json({ error: "We couldn't find any post with the specified ID!" }))
    .catch(err => res.status(500).json({ error: 'Something went wrong deleting that post!' }));
});

module.exports = router;