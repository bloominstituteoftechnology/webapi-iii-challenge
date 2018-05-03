const express = require('express');
const data = require('../data/helpers/userDb');

const router = express.Router();

router.get('/:id/posts', (req, res) => {
  data
    .getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved."
      });
    })
});

module.exports = router;