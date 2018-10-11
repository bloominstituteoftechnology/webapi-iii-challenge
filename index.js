const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { postDb, tagDb, userDb } = require("./data/helpers");

const server = express();
const port = 4000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("tiny"));

// Capital middleware
const capital = (req, res, next) => {
  req.capitalUser = { ...req.body };
  req.capitalUser.name = req.capitalUser.name.toUpperCase();
  next();
};

// Retrieve all exisiting users
server.get("/api/users/", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .cathc(err =>
      res.status(500).json({ error: "User's information could not be found." })
    );
});

// Retrieve user by specific ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ error: `User, ID ${id}, does not exist. ` });
      }
      return res.status(200).json(user);
    })
    .catch(err =>
      res.status(500).json({ error: "User's information could not be found." })
    );
});

// Retrieves all user posts given their ID
server.get("/api/users/:id/posts", (req, res) => {
  const { id } = req.params.id;
  userDb
    .getUserPosts(parseInt(id))
    .then(posts => {
      if (!posts.length) {
        return res
          .status(404)
          .json({ error: `User, ID ${id}, does not exist.` });
      }
      res.status(200).json(posts);
    })
    .catch(err =>
      res.status(500).json({ error: `User's information could not be found.` })
    );
});

// Generate new user by capital middleware
server.post("/api/users", capital, (req, res) => {
  const newUser = req.capitalUser;
  userDb
    .insert(newUser)
    .then(async id => {
      const newId = id.id;
      try {
        const user = await userDb.get(newId);
        if (!user) {
          return res.status(404).json({
            error: `New user, ID ${newId}, could not be retrieved.`
          });
        }
        return res.status(201).json(user);
      } catch (err) {
        return res.status(500).json({
          error: "New user information could not be retrieved."
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "An error has occured while saving user to the database."
      })
    );
});

// Update user information with capital middleware
server.put("/api/users/:id", capital, (req, res) => {
  const { id } = req.params;
  const updatedUser = req.capitalUser;
  userDb
    .update(parseInt(id), updatedUser)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ error: `User, ID ${id}, does not exist.` });
      }
      return userDb
        .get(id)
        .then(user => {
          if (!user) {
            return res.status(404).json({
              error: `The newly updated user with the ID ${id} could not be retrieved.`
            });
          }
          return res.status(200).json(user);
        })
        .catch(err =>
          res.status(500).json({
            error: "Newly updated user's information could not be retrieved."
          })
        );
    })
    .catch(err =>
      res.status(500).json({
        error:
          "An error has occured while updating user information in the database."
      })
    );
});

// Delete user from database given their ID
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(parseInt(id))
    .then(del => {
      if (!del) {
        return res
          .status(404)
          .json({ error: `User, ID ${id}, does not exist.` });
      }
      return res
        .status(200)
        .json({ message: `User, ID ${id}, was successfully deleted.` });
    })
    .catch(err =>
      res.status(500).json({
        error: "An error has occured while deleting the user in the database."
      })
    );
});

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
