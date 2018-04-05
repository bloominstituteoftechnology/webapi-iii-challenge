const express = require('express');
const server = express();
const user = require('./data/helpers/userDb');
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
  const { name } = req.body;
  const { id } = req.params;
  try {
    const response = await user.update(id, name);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

// post routes


// tag routes

server.listen(8080, () => console.log('Server running on port 8080'))
