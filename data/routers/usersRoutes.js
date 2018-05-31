const express = require('express');
const router = express.Router();
const db = require('../helpers/userDb.js')

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      sendError(500, "The users information could no tbe retrieved", res);
      return;
    });
});

router.get("/api/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  db
    .findById(id) // invoke proper db.method(id) passing it the id.
    .then(user => {
      if (user.length === 0) {
        sendError(404, `User with that id could not found`, res);
        return;
      }
      res.json({ user });
    })
    .catch(error => {
      sendError(500, "Error looking up post", res);
      return;
    });
});

module.exports = router;