const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();
// this replaces https://www.npmjs.com/package/express-async-handler
const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);


// Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await userDb.get(); 
  res.status('200').json(users);
}));

// Get a user
router.get('/:id', asyncHandler(async (req, res) => {
  const foundUserIdObject = await userDb.get(req.params.id); 
  if (!foundUserIdObject) throw `User with with id ${req.params.id} not found`;
  res.status('200').json(foundUserIdObject);
}));

// Add a user
router.post('/', asyncHandler(async (req, res) => {
  const newUser = req.body;

  const newUserIdObject = await userDb.insert(newUser); 
  res.status('200').json(newUserIdObject);
}));


// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedUserData = req.body;

  const numAffectedRows = await userDb.update(req.params.id, updatedUserData); 
  if (!numAffectedRows) throw `User with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

// Delete a user
router.delete('/:id', asyncHandler(async (req, res) => {
  const numAffectedRows = await userDb.remove(req.params.id); 
  if (!numAffectedRows) throw `User with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

module.exports = router;
