const express = require('express');
const router = express.Router();

// middleware

// endpoints
router.get('/', (req, res) => {
  res.send('GET /users')
});

router.get('/:id', (req, res) => {
  res.send(`GET /api/users/${req.params.id}`);
});

module.exports = router;