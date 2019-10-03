const express = require("express");
const postRouter = require("../posts/postRouter");
const server = express();
const userDb = require("./userDb");
const validateUserId = require("./middleware/validateUserId");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

userRouter.get("/:id", validateUserId, async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  }
});

userRouter.get("/:id/posts", validateUserId, (req, res) => {});

userRouter.post("/", (req, res) => {
  if (!req.body.id || !req.body.name)
    res.status(400).json({
      errorMessage: "Please provide title and contents for the user."
    });
  else {
    userDb
      .insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

userRouter.post("/:id/posts", (req, res) => {});

userRouter.delete("/:id", validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then(user => {
      res.status(204).json({});
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

userRouter.put("/:id", validateUserId, (req, res) => {
  if (!req.body.name || !req.body.id) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the user."
    });
  } else {
    userDb
      .update(req.params.id, req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

//custom middleware

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

server.use("/:id/posts", userRouter);

module.exports = userRouter;
