const express = require('express');
const router = express.Router();
const users = require('../data/helpers/userDb');

router.get('/', async (req, res) => {
  try {
    const allUsers = await users.get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Users could not be retrieved.", error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await users.get(req.params.id);
    if (user === undefined) {
      res.status(404).json({ message: "User does not exist." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "User could not be retrieved.", error: error.message });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "User's posts could not be retrieved.", error: error.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please enter a name." });
  }
  if (req.body.name.length > 128) {
    res.status(400).json({ message: "Name must be less than 128 characters." });
  }
  try {
    const { id } = await users.insert(req.body);
    try {
      const newUser = await users.get(id);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ message: "User does not exist.", error: error.message });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the user to the database.", error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please enter a name." });
  }
  if (req.body.name.length > 128) {
    res.status(400).json({ message: "Name must be less than 128 characters." });
  }
  try {
    await users.update(req.params.id, req.body);
    try {
      const user = await users.get(req.params.id);
      if (user === undefined) {
        res.status(404).json({ message: "User does not exist." });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "User could not be retrieved.", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the edited user to the database.", error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await users.remove(req.params.id);
    if (user === 0) {
      res.status(404).json({ message: "User does not exist." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the user from the database.", error: error.message });
  }
});

module.exports = router;
