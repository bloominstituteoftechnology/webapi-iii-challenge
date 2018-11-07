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

router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.get(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } catch (err) {
    res.status(500).json({ error: "The user's information could not be retrieved." });
  }
});

module.exports = router;
