const express = require('express');
const router = express.Router();

const postDb = require('../data/helpers/postDb');

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Couldn't find any posts" })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb.get(id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'})
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error with database"})
    })
})

router.post('/', (req, res) => {
  const body = req.body;
  if  (body.text && body.userId) {
    postDb.insert(body)
      .then(postId => {
        res.json(postId)
      })
      .catch(err => {
        res
          .status(500)
          .json({error: "Problem with the database"})
      })
  } else {
    res
      .status(400)
      .json({message: ' Please include a user ID and text'})
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDb.remove(id)
  .then(count => {
    if (count) {
      res.json({count})
    } else {
      res
        .status(404)
        .json({ error: "Post with specified ID does not exist"})
    }
  })
  .catch(err => {
    res
      .status(500)
      .json({error: "Database Error"})
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  
  if (body.text) {
    postDb.update(id, body)
      .then(count => {
        if (count) {
          res.json({ count })
        } else {
          res
            .status(404)
            .json({message: "Post with the specified ID does not exist"})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({error: "Database go boom"})
      })
  } else {
    res
      .status(400)
      .json({ message: "Please include a user ID and text to update"})
  }
})

module.exports = router;