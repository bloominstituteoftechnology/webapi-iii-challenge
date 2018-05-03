const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();
// this replaces https://www.npmjs.com/package/express-async-handler
const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);


// Get all
router.get('/', asyncHandler(async (req, res) => {
  const users = await postDb.get(); 
  res.status('200').json(users);
}));

// Get one 
router.get('/:id', asyncHandler(async (req, res) => {
  const foundPostIdObject = await postDb.get(req.params.id); 
  if (!foundPostIdObject) throw `Post with with id ${req.params.id} not found`;
  res.status('200').json(foundPostIdObject);
}));

// Add one 
router.post('/', asyncHandler(async (req, res) => {
  const newPost = req.body; 

  const newPostIdObject = await postDb.insert(newPost); 
  res.status('200').json(newPostIdObject);
}));


// Update one 
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedPostData = req.body;

  const numAffectedRows = await postDb.update(req.params.id, updatedPostData); 
  if (!numAffectedRows) throw `Post with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

// Delete one 
router.delete('/:id', asyncHandler(async (req, res) => {
  const numAffectedRows = await postDb.remove(req.params.id); 
  if (!numAffectedRows) throw `Post with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

module.exports = router;
