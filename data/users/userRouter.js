const express = require('express');
const router = express.Router();

// middleware

// endpoints
router.get('/api/users', (req, res) => {
  res.send('GET /users')
});

module.exports = router;