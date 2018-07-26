const express = require('express');
const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

// ============ Users ============

server.get('/api/users', async (req, res) => {
  try {
    const allUsers = await users.get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Users could not be retrieved.", error: error.message });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await users.get(req.params.id);
    if (user === undefined) {
      return res.status(404).json({ message: "User does not exist." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "User could not be retrieved.", error: error.message });
  }
});

server.get('/api/users/:id/posts', async (req, res) => {
  try {
    const posts = await users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "User's posts could not be retrieved.", error: error.message });
  }
});

server.post('/api/users', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please enter a name." });
  }
  if (req.body.name.length > 80) {
    res.status(400).json({ message: "Name must be less than 80 characters." });
  }
  try {
    const { id } = await users.insert(req.body);
    try {
      const newUser = await users.get(id);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ message: "User does not exist.", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the user to the database.", error: error.message });
  }
});

server.put('/api/users/:id', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please enter a name." });
  }
  if (req.body.name.length > 80) {
    res.status(400).json({ message: "Name must be less than 80 characters." });
  }
  try {
    await users.update(req.params.id, req.body);
    try {
      const user = await users.get(req.params.id);
      if (user === undefined) {
        res.status(404).json({ message: "User does not exist." });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "User could not be retrieved.", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the edited user to the database.", error: error.message });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await users.remove(req.params.id);
    if (user === 0) {
      res.status(404).json({ message: "User does not exist." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the user from the database.", error: error.message });
  }
});

// ============ Posts ============

server.get('/api/posts', async (req, res) => {
  try {
    const allPosts = await posts.get();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Posts could not be retrieved.", error: error.message });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await posts.get(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Post could not be retrieved.", error: error.message });
  }
});

server.get('/api/posts/:id/tags', async (req, res) => {
  try {
    const tags = await posts.getPostTags(req.params.id);
    if (tags.length === 0) {
      res.status(404).json({ message: "Post has no tags or does not exist." });
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Post tags could not be retrieved.", error: error.message });
  }
});

server.post('/api/posts', async (req, res) => {
  if (!req.body.text || !req.body.userId) {
    res.status(400).json({ message: "Please enter some text and/or a user ID." });
    return;
  }
  if (req.body.text.length > 128) {
    res.status(400).json({ message: "Text must be less than 128 characters." });
    return;
  }
  try {
    const { id } = await posts.insert(req.body);
    try {
      const newPost = await posts.get(id);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(404).json({ message: "Post does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the post to the database.", error: error.message });
  }
});

server.put('/api/posts/:id', async (req, res) => {
  if (!req.body.text || !req.body.userId) {
    res.status(400).json({ message: "Please enter some text and/or a user ID." });
  }
  if (req.body.text.length > 128) {
    res.status(400).json({ message: "Text must be less than 128 characters." });
  }
  try {
    await posts.update(req.params.id, req.body);
    try {
      const post = await posts.get(req.params.id);
      if (post === undefined) {
        res.status(404).json({ message: "Post does not exist." });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Post could not be retrieved.", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the edited post to the database.", error: error.message });
  }
});

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await posts.remove(req.params.id);
    if (post === 0) {
      res.status(404).json({ message: "Post does not exist." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the post from the database.", error: error.message });
  }
});

server.listen(8000, () => console.log('\n=== API running ===\n'));
