const express = require('express');
const usersDB = require('../data/helpers/userDb');
const router = express.Router();

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post("/", (req, res) => {
  const { name } = req.body;
  if (name.length < 1 || name.length > 128) {
    sendError(400, "Please provide a name that is between 1 and 128 characters long.", res);
    return;
  }
  usersDB
    .insert({ name })
    .then(response => {
      res.status(201).json({ response });
      return;
    })
    .catch(error => {
      sendError(
        500,
        "There was an error while saving the user to the database.",
        res
      );
      return;
    });
});

router.get('/', (req, res) => {

  usersDB
    .get()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      sendError(
        500,
        "There was an error while saving the post to the database.",
        res
      );
    });
});

// server.get('/api/users/:id');

module.exports = router;