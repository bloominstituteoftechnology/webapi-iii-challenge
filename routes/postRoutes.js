// NODE MODULES
// ==============================================
const express = require('express');
const postDb = require('../data/helpers/postDb.js');

// EXPRESS ROUTER
// ==============================================
const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'The posts could not be retrieved from the database.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postDb.get(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'The post could not be retrieved from the database.' });
  }
});

module.exports = router;
