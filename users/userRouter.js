const express = require("express");
const userRouter = express.Router();
const postRouter = require("../posts/postRouter");
const server = express();

const userDb = require("./userDb");
const validateUserId = require("./middleware/validateUserId");
const validateUser = require("./middleware/validateUser");

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

userRouter.get("/:id/posts", validateUserId, validateUser, (req, res) => {});

userRouter.post("/", validateUser, (req, res) => {
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
});

userRouter.post("/:id/posts", validateUserId, (req, res) => {});

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

userRouter.put("/:id", validateUserId, validateUser, (req, res) => {
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
});

server.use("/:id/posts", userRouter);

module.exports = userRouter;
