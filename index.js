const express = require("express");
const server = express();

const userDB = require("./data/helpers/userDb.js");

server.use(express.json());

//////////////================================= START REQUESTS =================================//////////////
// GET REQUEST //
server.get("/users", (req, res) => {
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

server.get("/users/:id", (req, res) => {
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
// end GET //

// POST REQUEST //
server.post("/users", async (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the user."
    });
  } else {
    try {
      const response = await userDB.insert(user);
      res.status(201).json({ message: "New user created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    }
  }
});
// end POST //

// DELETE REQUEST //
server.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userDB.remove(id);
    if (response === 0) {
      return res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    } else {
      return res.status(200).json({ message: "User deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      error: "The user could not be removed."
    });
  }
});
// end DELETE //

// PUT REQUEST //
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!user.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the user."
    });
  } else {
    userDB
      .update(id, user)
      .then(count => {
        if (count) {
          res.status(200).json({ message: `The count is ${count}` });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does note exist."
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

// GET USER POSTS REQUEST //
server.get("/users/:id/posts", (req, res) => {
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
// end GET USER POSTS //
//////////////================================= END REQUESTS =================================//////////////

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
