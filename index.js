const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const userDb = require("./data/helpers/userDb.js");

const server = express();



server.use(logger("tiny"), cors(), helmet(), express.json());
   
  //Get all users
server.get("/api/users", (req, res) => {
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


  //Get posts of a specific user
  server.get("/api/users/:id", (req, res) => {
    userDb
      .getUserPosts(req.params.id)
      .then(user => {
        if (user.length > 0) {
          res.json(user);
        } else
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." })
      );
  });


   // call server.listen w/ a port of your choosing
  server.listen(port, () => {
    console.log(`\n === API running on port ${port} ===\n`);
  });