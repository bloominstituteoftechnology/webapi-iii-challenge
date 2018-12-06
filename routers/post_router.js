const express = require('express');
const postDB = require('../data/helpers/postDb');
const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.get('/', (req, res) => {
  postDB
      .get()
      .then((posts) => {
          res.json(posts);
      })
      .catch(err => {
          res
          .status(500)
          .json({error: "The posts could not be retrieved."})
      });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  postDB
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404)
        .json({error: "The post with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500)
      .json({ message: "The post information could not be retrieved."})
    })
});

router.post('/', (req, res) => {
  const newPost = req.body;
  if (newPost.text && newPost.userId) {
    postDB.insert(newPost)
    .then(idInfo => {
      postDB.get(idInfo.id)
      .then(post => {
        res.status(201)
        .json(post);
      })
    })
    .catch(err => {
      res.status(500)
      .json({message: "There was error while saving the post to the database."})
    })
  } else {
    res.status(400)
    .json({message: "Provide the text and userID to be added to the database."})
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDB
    .remove(id)
    .then(count => {
      if (count) {
        res.json({message: "Post successfully deleted."})
      } else {
        res.status(404)
        .json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500)
      .json({message: "the post could not be removed."})
    })
});

router.put('/:id', (req, res) => {
  const editPost = req.body;
  const {id} = req.params;
  if (editPost) {
    postDB.update(id, editPost)
    .then(count => {
      if (count) {
        res.json({message: "The post was edited."});
      } else {
        res.status(400)
        .json({message: "the post with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500)
      .json({message: "The post information could not be updated."})
    })
  } else {
    res.status(400)
    .json({message: "Provide post's text or userId."})
  }
})

module.exports = router;