// NODE MODULES
// ==============================================
const express = require('express');
const userDb = require('../data/helpers/userDb.js');

// EXPRESS ROUTER
// ==============================================
const router = express.Router();

// CUSTOM MIDDLEWARE
// ==============================================
const toUpperCase = (req, _, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'The users could not be retrieved.' });
  }
});

module.exports = router;
