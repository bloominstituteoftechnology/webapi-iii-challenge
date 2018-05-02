const express = require('express');
const server = express();

server.use(express.json());

const userDb = require('./data/helpers/userDb');


server.listen(5000, () => console.log('\nServer listening on port 5000\n'));

// Get all users
server.get('/api/users', async (req, res) => {
  const users = await userDb.get(); 
  res.status('200').json(users);
});

// Get a user
server.get('/api/users/:id', async (req, res) => {
  const foundUserIdObject = await userDb.get(req.params.id); 
  res.status('200').json(foundUserIdObject);
});

// Add a user
server.post('/api/users', async (req, res) => {
  const newUser = req.body;
  const newUserIdObject = await userDb.insert(newUser); 
  res.status('200').json(newUserIdObject);
});


// Update a user
server.put('/api/users/:id', async (req, res) => {
  const updatedUserData = req.body;
  const numAffectedRows = await userDb.update(req.params.id, updatedUserData); 
  res.status('200').json(numAffectedRows);
});

// Delete a user
server.delete('/api/users/:id', async (req, res) => {
  const numAffectedRows = await userDb.remove(req.params.id); 
  res.status('200').json(numAffectedRows);
});
