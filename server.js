const express = require('express');
const server = express();

const userDb = require('./data/helpers/userDb');

server.listen(5000, () => console.log('\nServer listening on port 5000\n'));
server.use(express.json());

// this replaces https://www.npmjs.com/package/express-async-handler
const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);

// Get all users
server.get('/api/users', asyncHandler(async (req, res) => {
  const users = await userDb.get(); 
  res.status('200').json(users);
}));

// Get a user
server.get('/api/users/:id', asyncHandler(async (req, res) => {
  const foundUserIdObject = await userDb.get(req.params.id); 
  if (!foundUserIdObject) throw `User with with id ${req.params.id} not found`;
  res.status('200').json(foundUserIdObject);
}));

// Add a user
server.post('/api/users', asyncHandler(async (req, res) => {
  const newUser = req.body;

  const newUserIdObject = await userDb.insert(newUser); 
  res.status('200').json(newUserIdObject);
}));


// Update a user
server.put('/api/users/:id', asyncHandler(async (req, res) => {
  const updatedUserData = req.body;

  const numAffectedRows = await userDb.update(req.params.id, updatedUserData); 
  if (!numAffectedRows) throw `User with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

// Delete a user
server.delete('/api/users/:id', asyncHandler(async (req, res) => {
  const numAffectedRows = await userDb.remove(req.params.id); 
  if (!numAffectedRows) throw `User with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

const errorLog = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
}

server.use(errorLog);
