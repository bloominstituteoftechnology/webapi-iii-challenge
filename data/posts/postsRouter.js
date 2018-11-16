const express = require('express');
const router = express.Router();

// middleware

// endpoints
router.get('/api/posts', (req, res) => {
  res.send('GET /posts')
});

module.exports = router;