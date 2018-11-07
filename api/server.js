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

module.exports = server;
