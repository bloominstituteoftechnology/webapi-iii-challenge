const express = require("express");

const db = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res, next) => {
  db
  .get()
  .then(users => {
    res.json(users);
  })
  .catch(error => {
    res.status(500).json({ error: error})
  })
})

router.get('/:id', (req, res, next) => {
  const  id  = req.params;

  userDb
  .get(id)
  .then(users => {
    res.json(users);
  }) 
  .catch (error => {
    res.status(500).json({error: error});
  });
});