const express = require("express");
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");
const tags = require("./data/helpers/tagDb");
const port = 9000;

const server = express();
server.use(express.json());

// Middleware

const uppercaseMiddleware = (req, res, next) => {
  req.body.name =
    req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  next();
};

// Getting all users

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "Users can not be retrieved",
        error: err
      });
    });
});

// Getting Individual Users

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .get(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "User does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not retrieve user" });
    });
});

// Get users posts

server.get("/api/users/:id/posts", (req, res) => {
  const { id } = req.params;
  users
    .getUserPosts(id)
    .then(usersPost => {
      if (!usersPost) {
        res.status(404).json({ message: "Users post does not exist " });
      } else {
        res.status(200).json({ usersPost });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error retrieving users post " });
    });
});

// POST requests

server.post("/api/users", uppercaseMiddleware, (req, res) => {
  const user = users.insert(req.body);
  users
    .get(user.id)
    .then(user => {
      if (req.body.name === "") {
        res
          .status(400)
          .json({ message: "Please provide a name for the user." });
      } else if (req.body.name.length > 128) {
        res.status(400).json({
          messsage: "Users name can not be longer than 128 characters"
        });
      } else {
        res.status(201).json({ message: "User added" });
      }
    })
    .catch(err =>
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      })
    );
});

// Delete user

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const removeUser = users.get(id);
  users
    .remove(id)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "User with specified Id does not exist" });
      } else {
        res.status(200).json(removeUser);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error when deleting the user" });
    });
});

//  PUT request

server.put("/api/users/:id", uppercaseMiddleware, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  users
    .update(id, changes)
    .then(count => {
      if (changes.name === "") {
        res
          .status(400)
          .json({ message: "Please provide a name for the user." });
      } else if (changes.name.length > 128) {
        res.status(400).json({
          messsage: "Users name can not be longer than 128 characters"
        });
      } else {
        res.status(200).json({ message: `${count} user updated` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error with updating the users post" });
    });
});

// Posts

server.get("/api/posts", (req, res) => {
  const { id } = req.params;
  posts
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => ({
      message: "Could not retrieve any post at this time"
    }));
});
server.listen(port, () => console.log(`\nServer listening on port ${port}`));
