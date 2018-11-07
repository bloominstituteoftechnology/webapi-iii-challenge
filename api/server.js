const express = require('express');
const userDb = require('../data/helpers/userDb');

const server = express();

// Middleware
server.use(express.json());

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

// GET a single users posts
server.get('/api/users/:id/posts', async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await userDb.getUserPosts(id);
    if (!userPosts) {
      res.status(404).json({ message: 'That user does not exist' });
    } else {
      res.status(200).json(userPosts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve that user' });
  }
});

// POST add a new user
server.post('/api/users', async (req, res) => {
  const newUser = req.body;
  if (newUser.name.length > 128) {
    res.status(400).json({
      message: "User name too long. User's can have up to 128 characters"
    });
  } else if (!newUser.name) {
    res.status(400).json({ message: 'User needs a name' });
  } else {
    try {
      const newUserId = await userDb.insert(newUser);
      const user = await userDb.get(newUserId.id);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'There was an error creating a new user' });
    }
  }
});

// PUT request to update user
server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUserInfo = req.body;
  if (updatedUserInfo.name.length > 128) {
    res.status(400).json({
      message: "User name too long. User's can have up to 128 characters"
    });
  } else if (!updatedUserInfo.name) {
    res.status(400).json({ message: 'User needs a name' });
  } else {
    try {
      const count = await userDb.update(id, updatedUserInfo);
      if (!count) {
        res.status(500).json({ error: 'There was an error updating' });
      } else {
        const updatedUser = await userDb.get(id);
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: 'There was an error updating user' });
    }
  }
});

// DELETE request user
server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const removedUser = await userDb.get(id);
    if (!removedUser) {
      res
        .status(400)
        .json({ message: "Sorry, I can't delete a user who doesn't exist." });
    } else {
      await userDb.remove(id);
      res.status(200).json(removedUser);
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error deleting the user.' });
  }
});

module.exports = server;
