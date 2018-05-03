const express = require('express');
const db = require('../data/seeds/02-users.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ api: 'running' });
});
router.post('/', (req, res, next) => {
  res.json({ api: 'running' });
});
router.put('/', (req, res, next) => {
  res.json({ api: 'running' });
});
router.delete('/', (req, res, next) => {
  res.json({ api: 'running' });
});

module.exports = router;