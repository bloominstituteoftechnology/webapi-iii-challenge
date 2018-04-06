const express = require('express');
const server = express();
const user = require('./data/helpers/userDb');
const post = require('./data/helpers/postDb');
const tag = require('./data/helpers/tagDb.js');

// const db = require('./data/dbConfig');

// middleware
server.use(express.json());


// user routes
server.get('/users', async (req, res) => {
  try {
    const response = await user.get();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

server.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  // res.json(req.params);
  try {
    const response = await user.get(id)
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.get('/users/:id/posts', async (req, res) => {
  const { id } = req.params;
  try { 
    const response = await user.getUserPosts(id)
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
})

server.post('/users', async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) return res.status(400).json({ error: 'These require a name' });
    const response = await user.insert({ name });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log('I love cats');
  }
})
server.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await user.remove(id)
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.put('/users/:id', async (req, res) => {
  const name = req.body;
  console.log(req.body);
  const { id } = req.params;
  try {
    const response = await user.update(id, name);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

// post routes
server.get('/posts', async (req, res) => {
  try {
    const response = await post.get();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await post.get(id);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.get('/posts/:id/tags', async (req, res) => {
  const { id } = req.params;
  try { 
    const response = await post.getPostTags(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
})

server.post('/posts', async (req, res) => {
  const { userId, text } = req.body;
  try {
    if (!userId) return res.status(400).json({ error: 'These require a userId' });
    const response = await post.insert({ userId, text });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await post.remove(id)
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const text = req.body;
  console.log(req.body);
  try {
    const response = await post.update(id, text);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})


// tag routes
server.get('/tags', async (req, res) => {
  try {
    const response = await tag.get();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.get('/tags/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await tag.get(id);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})


server.post('/tags', async (req, res) => {
  const { tag } = req.body;
  try {
    if (!tag) return res.status(400).json({ error: 'These require a tag' });
    const response = await tag.insert({ tag });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log('I love cats');
  }
})
server.delete('/tags/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await tag.remove(id)
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

server.put('/tags/:id', async (req, res) => {
  const tags = req.body;
  console.log(req.body);
  console.log(tags);
  const { id } = req.params;
  try {
    const response = await tag.update(id, tags);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})




server.listen(8080, () => console.log('Server running on port 8080'))
