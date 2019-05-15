const express = 'express';
const dbUsers = require("../data/helpers/userDb.js");

const router = express.Router();

router.get('/', (req, res) => {
  dbUsers
    .getById(req.params.id)
    .then((user) => {
      if (user.length === 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The user information could not be retrieved" });
    })
});

router.get('/:id', (req, res) => {
  dbUsers
    .getById(req.params.id)
    .then((user) => {
      if (user.length === 0 ) {
        res.status(404).json({ message: "The user with the specifie ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The user information could not be retrieved." });
    })
});

router.get("/:id/posts", (req, res) => {
  dbUsers
    .getUsersPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
})

router.post('/', (req, res) => {
  const newUser = req.body;
  if (!newUser.hasOwnProperty("name")) {
    res.status(400).json({ errorMessage: "Please provide name for the user" })
  }
  dbUsers
    .insert(newUser)
    .then((idOfNewUser) => {
      res.status(201).json(idOfNewUser);
    })
    .catch((err) => {
      res.status(500).json({ error: "There was an error while saving new user to the database"})
    })
});

router.delete('/:id', (req, res) => {
  dbUsers
    .remove(req.params.id)
    .then((numOfUserDeleted) => {
      if (!numOfUserDeleted) {
        res.status(404).json({ message: "User with the specified ID does not exist" })
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "User could not be removed" });
    })
});

router.put('/:id', (req, res) => {
  const userToUpdate = req.body;
  if (!userToUpdate.hasOwnProperty("name")) {
    res.status(400).json({ errorMessage: "Please provide name for the user" })
  }
  dbUsers
    .update(req.params.id, userToUpdate)
    .then((numOfUpdatedUsers) => {
        if (!numOfUpdatedUsers) {
          res.status(404).json({ message: "User with the specified ID does not exist."})
        } else {
          dbUsers.getById(req.params.id).then((updatedUser) => {
            res.status(200).json(updatedUser);
          })
        }
    })
    .catch((err) => {
      res.status(500).json({ error: "User information could not be modified."})
    })
});

module.exports = router;
