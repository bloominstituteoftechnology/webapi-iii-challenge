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

router.get("/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  db
    .get(id) // invoke proper db.method(id) passing it the id.
    .then(user => {
      if (user.length === 0) {
        sendError(404, `User with id ${id} could not found`, res);
        return;
      }
      res.json({ user });
    })
    .catch(error => {
      sendError(500, "Error looking up user", res);
      return;
    });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    sendError(400, "Must provide name", res);
    return;
  }
  db
    .insert({ name })
    .then(response => {
      db.get(response.id).then(user => {
        res.json({ user });
      });
    })
    .catch(error => {
      sendError(400, error, res);
      return;
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(user => {
      if (user === 0) {
        sendError(404, `User with id ${id} could not found, can not delete it.`, res);
        return;
      }
      res.json({ user });
    })
    .catch(error => {
      console.log(error);
      sendError(500, "Error deleting user", res);
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    sendError(400, "Must provide name", res);
    return;
  }
  db
    .update(id, { name })
    .then(response => {
      if (response == 0) {
        sendError(404, `User with id ${id} could not found.`, res);
        return;
      }
      db.get(id).then(user => {
        console.log(user);
        if (user.length === 0) {
          sendError(404, "User with id ${id} could not found.", res);
          return;
        }
        res.json({ user });
      });
    })
    .catch(message => {
      sendError(400, message, res);
      return;
    });
});

module.exports = router;