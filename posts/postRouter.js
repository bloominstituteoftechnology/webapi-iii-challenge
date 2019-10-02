const express = require('express');
const postDB = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDB.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({message: "Error retrieving from database"}));
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).send(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  postDB.remove(req.post.id)
  .then(success => res.status(201).json({message: "Post succesfully deleted"}))
  .catch(err => res.status(500).json({message:"Error deleting from database"}));
});

router.put('/:id', validatePostId, (req, res) => {
  if (!req.body) {
    res.status(400).json({message: "missing post data"});
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"});
  } else {
    postDB.update(req.post.id, req.body)
      .then(records => res.status(201).json({...req.post, ...req.body}))
      .catch(err => res.status(500).json({message: "Error modifying database"}));
  }
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  postDB.getById(id)
    .then(foundPost => {
      if (foundPost) {
        req.post = foundPost;
        next();
      } else {
        res.status(400).json({message: "invalid post id"});
      }
    })
    .catch(err => res.status(500).json({message: "Error retrieving from database"}));
};

module.exports = router;