const express = require('express');
const userRouter = express.Router();

const userDb = require('../helpers/userDb.js');

// Server
userRouter.get('/api/users/:id', (req, res) => {
  db
    .get(id)
    .then(respond => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = userRouter;
