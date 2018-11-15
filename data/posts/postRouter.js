const express = require('express');
const router = express.Router();
const postDb = require('../helpers/postDb.js');
//middleware

//ENDPOINTS
// /api/products/
//all posts
router.get('/all', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

//post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb.get(id)
    .then(post => {
        res.status(200).json(post); })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved."})
    })
});

//create post
router.post('/', (req, res) => {
  postDb.insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Post creation error "})
    })
});

//update post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDb.update(id, changes)
    .then(post => {
      if(post) {
        res.status(200).json({ message: "post updated" })
      } else {
        res.status(404).json({ message: "post not found" })
      }
    })
    .catch( err => {
      res.status(500).json({ message: "error updating the post "})
    });
});

//delete post
router.delete('/:id', (req, res) => {
  postDb.remove(req.params.id)
    .then(post => {
      res.status(200).json(count)
    }).catch (err => {
      res.status(500).json({ message: 'error deleting post' })
    });
});

module.exports = router;