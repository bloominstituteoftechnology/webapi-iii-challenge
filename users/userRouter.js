const express = require("express");
const postRouter = require("../posts/postRouter");
const server = express();
const userDb = require("./userDb");
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

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  }
});

userRouter.get("/:id/posts", (req, res) => {});

userRouter.post("/", (req, res) => {});

userRouter.post("/:id/posts", (req, res) => {});

userRouter.delete("/:id", (req, res) => {});

userRouter.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

server.use("/:id/posts", userRouter);

module.exports = userRouter;
