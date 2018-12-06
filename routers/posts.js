const express = require('express');

const router = express.Router()

// /api/posts/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params
    postDb
    .get(userId)
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      res.status(500)
      .send({ message: 'unable retrieve posts.' });
    });
});

module.exports = router;
