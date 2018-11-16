const express = require('express');
const router = express.Router();

// middleware

// endpoints
router.get('/', (req, res) => {
  res.send('GET /posts')
});

router.get('/:id', (req, res) => {
  res.send(`GET /api/posts/${req.params.id}`)
})

module.exports = router;