const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("short"));
const port = 9000;

const sendUserError = (status, msg, res, err) => {
  res.status(status).json({ error: msg });
  console.error(err);
  return;
};

const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

// users

server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      sendUserError(
        500,
        "The users' information could not be retrieved.",
        res,
        err
      );
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: `User id ${id} not found` });
      }
    })
    .catch(err => {
      sendUserError(
        500,
        "The user's information could not be retrieved.",
        res,
        err
      );
    });
});

server.get("/api/users/:id/posts", (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: `User, id ${id} not found` });
      }
    })
    .catch(err => {
      sendUserError(
        500,
        "The user's post information could not be retrieved.",
        res,
        err
      );
    });
});

server.post("/api/users/", upperCase, (req, res) => {
  const newUser = req.body;
  if (!newUser) {
    res.status(400).json({ message: "Please provide a username." });
    return;
  }
  userDb
    .insert(newUser)
    .then(userId => {
      res.status(201).json({ message: `Added user with id of ${userId.id}.` });
    })
    .catch(err => {
      sendUserError(
        500,
        "There was an error while saving the user to the database",
        res,
        err
      );
    });
});

server.put("/api/users/:id", upperCase, (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  userDb.get(id).then(user => {
    if (user) {
      userDb
        .update(id, newUser)
        .then(count => {
          res
            .status(200)
            .json(`Updated ${count} user. User id ${id} successfully updated.`);
        })
        .catch(err =>
          sendUserError(
            500,
            "The user information could not be modified.",
            res,
            err
          )
        );
    } else {
      res.status(404).json({ error: `User id ${id} not found` });
    }
  });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb.get(id).then(user => {
    if (user) {
      userDb
        .remove(id)
        .then(count => {
          res
            .status(200)
            .json(`Deleted ${count} user. User id ${id} successfully deleted.`);
        })
        .catch(err => {
          sendUserError(500, "The user could not be deleted.", res, err);
        });
    } else {
      res.status(404).json({ error: `User id ${id} not found` });
    }
  });
});

// posts

server.get("/api/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      sendUserError(
        500,
        "The posts' information could not be retrieved.",
        res,
        err
      );
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: `Post id ${id} not found` });
      }
    })
    .catch(err => {
      sendUserError(
        500,
        "The user's information could not be retrieved.",
        res,
        err
      );
    });
});

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
