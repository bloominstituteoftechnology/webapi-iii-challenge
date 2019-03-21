const express = require("express");

const Users = require("./data/helpers/userDb.js");
const capitalName = require("./middleware/uppercaseName.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (err) {
    console.log(error);
    res.status(500).json({
      error: "The users information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user"
    });
  }
});

router.post("/", capitalName, async (req, res) => {
  const user = await Users.insert(req.body);
  //   console.log(user);
  console.log(req.body.name);
  if (user.name) {
    try {
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide name for the user."
    });
  }
});

// router.post('/', capitalName, (req, res) => {
//     const newUser = req.body;
//     console.log(newUser);

//     if(newUser.name) {
//         Users.insert(newUser)
//         .then(user => {
//             res.status(201).json(user);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'There was an error while saving the user to the database '})
//         });
//     } else {
//         res.status(400).json({ errorMessage: 'Please provide the name for the user'})
//     }
// });

router.delete("/:id", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).end();
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "The user could not be removed" });
  }
});

router.put("/:id", capitalName, async (req, res) => {
  const { id } = req.params;
  const userChange = req.body;
  if (userChange.name) {
    try {
      const user = await Users.update(id, userChange);
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user " });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);

    if (posts && posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "No posts for this User" });
    }
  } catch (error) {
    res.status(500).json({ message: "error getting the posts for this user" });
  }
});

module.exports = router;
