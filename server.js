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

const usersNotRetrieved = "The users could not be retrieved.";
const userNotRetrieved = "The user could not be retrieved.";
const userNotFound = "The user with the specified ID does not exist.";
const userPostsNotRetrieved = "The user's posts could not be retrieved.";
const noPosts = "This user has no posts."
const missingName = "Please provide a name for this user."
const userSaveError = "There was an error while saving the user to the database.";
const userDeleteError = "There was an error while deleting the user from the database.";
const userEditError = "There was an error while saving the edited user to the database.";

const postsNotRetrieved = "The posts could not be retrieved.";
const postNotRetrieved = "The post could not be retrieved.";
const postNotFound = "The post with the specified ID does not exist.";
const postTagsNotRetrieved = "The post's tags could not be retrieved.";
const noTags = "This post has no tags."
const missingIDOrText = "Please provide an ID and/or text for this post."
const postSaveError = "There was an error while saving the post to the database.";

// ============ Users ============

server.get('/api/users', async (req, res) => {
  try {
    const allUsers = await users.get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: usersNotRetrieved, error: error.message });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await users.get(req.params.id);
    if (user === undefined) {
      res.status(404).json({ message: userNotFound, error: error.message });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: userNotRetrieved, error: error.message });
  }
});

server.get('/api/users/:id/posts', async (req, res) => {
  try {
    const posts = await users.getUserPosts(req.params.id);
    if (posts.length === 0) {
      res.status(404).json({ message: noPosts, error: error.message });
      return;
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: userPostsNotRetrieved, error: error.message });
  }
});

server.post('/api/users', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: missingName, error: error.message });
  }
  try {
    const { id } = await users.insert(req.body);
    try {
      const newUser = await users.get(id);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ message: userNotFound, error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: userSaveError, error: error.message });
  }
});

server.put('/api/users/:id', async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: missingName, error: error.message });
  }
  try {
    await users.update(req.params.id, req.body);
    try {
      const user = await users.get(req.params.id);
      if (user === undefined) {
        res.status(404).json({ message: userNotFound, error: error.message });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: userNotRetrieved, error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: userEditError, error: error.message });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await users.remove(req.params.id);
    if (user === 0) {
      res.status(404).json({ message: userNotFound, error: error.message });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: userDeleteError, error: error.message });
  }
});

// ============ Posts ============

server.get('/api/posts', async (req, res) => {
  try {
    const allPosts = await posts.get();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: postsNotRetrieved, error: error.message });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await posts.get(req.params.id);
    if (post === undefined) {
      res.status(404).json({ message: postNotFound, error: error.message });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: postNotRetrieved, error: error.message });
  }
});

server.get('/api/posts/:id/tags', async (req, res) => {
  try {
    const tags = await posts.getPostTags(req.params.id);
    if (tags.length === 0) {
      res.status(404).json({ message: noTags, error: error.message });
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: postTagsNotRetrieved, error: error.message });
  }
});

server.post('/api/posts', async (req, res) => {
  if (!req.body.userId || !req.body.text) {
    res.status(400).json({ error: missingIDOrText, message: error.message });
  }
  try {
    const { id } = await posts.insert(req.body);
    try {
      const newPost = await posts.get(id);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: postNotFound, error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: postSaveError, error: error.message });
  }
})

server.listen(8000, () => console.log('\n=== API running ===\n'));
