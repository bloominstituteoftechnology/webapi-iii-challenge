const express = require('express');
const userDb = require('../data/helpers/userDb');

const server = express();

// USER ROUTES

// GET an array of all users
server.get('/api/users', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the users' });
  }
});

// GET a single user
server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userDb.get(id);
    if (!user) {
      res.status(404).json({ message: 'That user does not exist' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve that user' });
  }
});

module.exports = server;
