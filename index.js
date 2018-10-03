// add imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// add data helpers
// users data
const users = require("./data/helpers/userDb");

// instantiate server
const server = express();

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

// listen to port 8000 and give a startup message from the server
server.listen(8000, () => console.log("API listening on port 8000"));
