const express = require("express");

const router = express.Router();

const userDb = require("../data/helpers/userDb");

module.exports = router;

const allCaps = (req, res, next) => {
    console.log(req.body);
  
    Object.assign(req.body, { name: req.body.name.toUpperCase() });
  
    next();
  };

//=============== USER ENDPOINTS =============== //

//Get all users
router.get("/", (req, res) => {
    userDb
      .get()
      .then(users => {
        res.json(users);
      })
      .catch(err =>
        res.status(500).json({
          error: "The users information could not be retrieved."
        })
      );
  });
  
//Get posts of a specific user (by id)
router.get("/:id/posts", (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(user => {
      if (user.length > 0) {
        res.json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        })};
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
      }
    );
});

//Add a new User
router.post("/", allCaps, (req, res) => {
  const newUser = req.body;
  if (newUser.name.length > 128) {
      return res.status(411).json({
        user, message: " The user name must be under 129 characters."
      });
    }
  userDb
    .insert(newUser)
    .then(user => {
      res.status(201).json({user, message: "The user was added successfully"});
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      });
    });
});

//Delete a user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(user => {
      if (user.length < 1) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json({user, message: "The user was deleted successfully"});
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The user could not be removed."
      })
    );
});

//Update a user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  userDb
    .update(id, newUser)
    .then(user => {
      if (user.length < 1) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json({user, message: "The user was updated successfully"});
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The user information could not be modified.."
      })
    );
});
