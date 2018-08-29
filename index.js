const express = require("express");
const server = express();

const userDB = require("./data/helpers/userDb.js");
const postDB = require("./data/helpers/postDb.js");

server.use(express.json());

//////////////================================= START MIDDLEWARE =================================//////////////
// converts name to all uppercase
const nameToUpperCase = (req, res, next) => {
  // gets rid of name if too many chars
  if (req.body.name.length > 128) {
    res.status(400).json({ message: "Username contains too many characters." });
  }
  req.body.name = req.body.name.toUpperCase();
  next();
};
//////////////================================= END MIDDLEWARE =================================//////////////

//////////////================================= START USERDB REQUESTS =================================//////////////
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

// GET USER POSTS REQUEST
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

// end GETS //

// POST REQUEST //
server.post("/users", nameToUpperCase, async (req, res) => {
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
server.put("/users/:id", nameToUpperCase, (req, res) => {
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
          res.status(200).json({ message: "User successfully modified." });
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

//////////////================================= END USERDB REQUESTS =================================//////////////

//////////////================================= START POSTDB REQUESTS =================================//////////////
// GET REQUESTS
server.get("/posts", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        return res.status(200).json({ post });
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
//// MUST BE ID OF EXISTING USER ////

server.post("/posts", async (req, res) => {
  const post = req.body;
  if (!post.userId || !post.text) {
    return res.status(400).json({
      errorMessage: "Please provide the correct User ID and text."
    });
  } else {
    try {
      const response = await postDB.insert(post);
      res.status(201).json({ message: "New post created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    }
  }
});
// end POST //

//////////////================================= END POSTDB REQUESTS =================================//////////////

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
