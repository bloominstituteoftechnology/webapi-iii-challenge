const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());

//View Users
server.get('/users', (req, res) => {
  userDb
  .get()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive users"})
  })
})
//View User by ID
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
  .getUserPosts(id)
  .then(user => {
    if (user.length === 0) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      res.status(200).json({ user })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be retrieved." })
  })
})
//View Posts
server.get('/posts', (req, res) => {
  postDb
  .get()
  .then(posts => {
    res.status(200).json({ posts });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive posts"})
  })
})
//View Post by ID
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
  .get(id)
  .then(post => {
    if (post.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
})
//View a Post's Tags
server.get('/posts/:id/tags', (req, res) => {
  postDb
  .getPostTags(id)
  .then(post => {
    if (post.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post's tags could not be retrieved." })
  })
})
//View Tags
server.get('/tags', (req, res) => {
  tagDb
  .get()
  .then(tags => {
    res.status(200).json({ tags });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive tags"})
  })
})
//View Tag by ID
server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  tagDb
  .get(id)
  .then(tag => {
    if (tag.length === 0) {
      res.status(404).json({ message: "The tag with the specified ID does not exist." })
    } else {
      res.status(200).json({ tag })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The tag information could not be retrieved." })
  })
})
//Add New User
server.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name for the user." })
    return;
  }
  userDb
  .insert({ name })
  .then(user => {
    res.status(200).json({ user })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  })
})
//Add New Post
server.post('/posts', (req, res) => {
  const { userId, text } = req.body;
  if (!text || !userId) {
    res.status(400).json({ errorMessage: "Please provide a user ID and text for the post." })
    return;
  }
  postDb
  .insert({ userId, text })
  .then(post => {
    res.status(200).json({ post })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
})
//Add New Tag
server.post('/tags', (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide a tag." })
    return;
  }
  tagDb
  .insert({ tag })
  .then(tag => {
    res.status(200).json({ tag })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the tag to the database" })
  })
})
//Update User
server.put('/users/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if(!name) {
    res.status(400).json({ error: "Please provide a new name for this user"});
  }
  userDb
  .update(id, { name })
  .then(user => {
    if(user === 0) {
      res.status(404).json({ error: "The user with the specified ID does not exist" })
      return;
    }
    res.status(200).json({ user })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while updating the name to the database" })
  })
})

//Update Post
server.put('/posts/:id', (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  if(!text) {
    res.status(400).json({ error: "Please update the text for this post"});
  }
  postDb
  .update(id, { text })
  .then(post => {
    if(text === 0) {
      res.status(404).json({ error: "The post with the specified ID does not exist" })
      return;
    }
    res.status(200).json({ post })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while updating the post to the database" })
  })
})

//Update Tag
server.put('/tags/:id', (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  if(!tag) {
    res.status(400).json({ error: "Please update the text for this tag"});
    return;
  }
  tagDb
  .update(id, { tag })
  .then(tag => {
    if (tag === 0) {
      res.status(404).json({ message: "The tag with the specified ID does not exist." })
      return;
    }
      res.status(200).json({ tag })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while updating the tag to the database" })
  })
})

server.listen(8000, () => console.log('API running on port 8000'));
