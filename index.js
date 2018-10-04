// add imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// add data helpers
// users data
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");

// instantiate server
const server = express();

// create custom middleware
const upperCase = (req, res, next) => {
  console.log("middleware running");
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
};

// add global middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("combined"));

// add a home route
server.get("/", (req, res) => {
  res.json({ hello: "hello World" });
});

// add a get route for the users
server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await users.get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "unable to retrieve users" });
  }
});

// add a get route to get a single user based upon id
server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await users.get(req.params.id);
    // test if user is undefined
    if (user === undefined) {
      res
        .status(404)
        .json({ message: `unable to find user at ${req.params.id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "unable to retrieve user" });
  }
});

// get a users posts based upon user id (DAY 2)
server.get("/api/users/:id/posts", async (req, res) => {
  try {
    const posts = await users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({
        message: `user at id of ${
          req.params.id
        }'s posts could not be retrieved.`,
        error: error.message
      });
  }
});

// add a post route to create a user
server.post("/api/users", upperCase, async (req, res) => {
  // test if the user has supplied a name
  if (!req.body.name) {
    res
      .status(400)
      .json({ errorMessage: "please supply a name for this user" });
  }
  try {
    const { id } = await users.insert(req.body);
    try {
      const newUser = await users.get(id);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ message: `unable to find user at ${id}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "error while saving the user to the database" });
  }
});

// update user at id
server.put("/api/users/:id", upperCase, async (req, res) => {
  // test to see if name is missing
  if (!req.body.name) {
    res
      .status(400)
      .json({ errorMessage: "please supply a name for this user" });
  }
  try {
    await users.update(req.params.id, req.body);
    try {
      const user = await users.get(req.params.id);
      if (user === undefined) {
        res.status(404).json({ message: `unable to find user at ${id}` });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "unable to retrieve user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while saving the edited user to the database" });
  }
});

// delete a user with a specific id
server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await users.remove(req.params.id);
    if (user === 0) {
      return res.status(404).json({ message: `unable to find user at ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error while deleting the user from the database" });
  }
});

// day 2 posts

// listen to port 8000 and give a startup message from the server
server.listen(8000, () => console.log("API listening on port 8000"));
