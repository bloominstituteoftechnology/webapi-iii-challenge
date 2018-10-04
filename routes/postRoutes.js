const express = require('express');
const router = express.Router();
const postDB = require('../data/helpers/postDb');

router.get('/', (req, res) => {
  postDB.get()
    .then(post => {
      res.json(post);
    })
    .catch(err => console.log(err));
}) // return all posts

router.get('/:id', (req, res) => {
  postDB.get(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => console.log(err));
}); // supply post ID, recieve post object

router.post('/', (req, res) => {
  postDB.insert(req.body)
    .then(({ id }) => res.json({ message: `Success: returned ID ${id}` }))
    .catch(err => console.log(err));
}); // add post, recieve new ID

router.put('/:id', (req, res) => {
  if (!req.body.userId) { return res.json({ message: `Error: need userId` }) }
  if (!req.body.text) { return res.json({ message: 'Error: need text' }) }
  postDB.update(req.params.id, req.body)
    .then(count => {
      if (!count) { return res.json({ message: `Error: No post by that id` }) }
      res.json({ message: `Success: updated ${count} record` })
    })
    .catch(err => console.log(err));
}); // update post, recieve updated count

router.delete('/:id', (req, res) => {
  postDB.remove(req.params.id)
    .then(removed => {
      if (!removed) { return res.json({ message: `Error: No post by ID ${req.params.id} ` }) }
      res.json({ message: `Success: Post ID ${req.params.id} was deleted. Removed ${removed} post.` })
    })
    .catch(err => console.log(err));
}) // delete post, recieve deleted count

module.exports = router;