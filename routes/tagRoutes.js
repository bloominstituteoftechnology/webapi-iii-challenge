const express = require('express');
const tagDb = require('../data/helpers/tagDb');

const router = express.Router();
// this replaces https://www.npmjs.com/package/express-async-handler
const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);


// Get all
router.get('/', asyncHandler(async (req, res) => {
  const users = await tagDb.get(); 
  res.status('200').json(users);
}));

// Get one 
router.get('/:id', asyncHandler(async (req, res) => {
  const foundTagIdObject = await tagDb.get(req.params.id); 
  if (!foundTagIdObject) throw `Tag with id ${req.params.id} not found`;
  res.status('200').json(foundTagIdObject);
}));

// Add one 
router.post('/', asyncHandler(async (req, res) => {
  const newTag = req.body; 

  const newTagIdObject = await tagDb.insert(newTag); 
  res.status('200').json(newTagIdObject);
}));


// Update one 
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedTagData = req.body;

  const numAffectedRows = await tagDb.update(req.params.id, updatedTagData); 
  if (!numAffectedRows) throw `Tag with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

// Delete one 
router.delete('/:id', asyncHandler(async (req, res) => {
  const numAffectedRows = await tagDb.remove(req.params.id); 
  if (!numAffectedRows) throw `Tag with id ${req.params.id} not found`;
  res.status('200').json(numAffectedRows);
}));

module.exports = router;
