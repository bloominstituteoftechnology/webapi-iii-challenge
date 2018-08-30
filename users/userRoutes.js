const express = require("express");

const userDB = require("../data/helpers/userDb.js");
// const server = express();
// above turns into below when
// using routes
const router = express.Router();

// middleware used here instead of index.js because
// only 2 requests use the middleware function
const nameToUpperCase = require("../middleware/nameToUpperMW.js");

// IMPORTANT "/users" turns into "/" you link url
// on index.js when using express.Router()

// GET REQUEST //
router.get("/", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        return res.status(200).json({ user });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// GET USER POSTS REQUEST
router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDB
    .getUserPosts(id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        return res.status(200).json({ user });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});
// end GETS //

// POST REQUEST //
router.post("/", nameToUpperCase, async (req, res) => {
  const user = req.body;
  if (!user.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the user.",
    });
  } else {
    try {
      const response = await userDB.insert(user);
      res.status(201).json({ message: "New user created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database.",
      });
    }
  }
});
// end POST //

// DELETE REQUEST //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userDB.remove(id);
    console.log("RESPONSE", response);
    if (response === 0) {
      return res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    } else {
      return res.status(200).json({ message: "User deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      error: "The user could not be removed.",
    });
  }
});
// end DELETE //

// PUT REQUEST //
router.put("/:id", nameToUpperCase, (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!user.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the user.",
    });
  } else {
    userDB
      .update(id, user)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "User successfully modified." });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does note exist.",
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});
// end PUT //

module.exports = router;
