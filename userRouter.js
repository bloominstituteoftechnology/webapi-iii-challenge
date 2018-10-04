const express = require("express");

// db helper functions
const userdb = require("./data/helpers/userDb");

// import router
const userRouter = express.Router();

// middleware
const yell = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}

userRouter.get("/", (req, res) => {
  userdb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send(err));
});

userRouter.get("/:id", (req, res) => {
  const {id} = req.params;
  userdb
    .get(id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});

userRouter.get("/:id/posts", (req, res) => {
  const {id} = req.params;
  userdb.getUserPosts(id)
    .then(posts => {
      if(posts.length < 1) {
        res.status(200).send(`User at id: ${id} does not have any posts.`)
        return;
      }
      res.status(200).send(posts);
    })
    .catch(err => res.status(500).send(err));
});

userRouter.post("/", yell, (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  console.log(newUser);
  userdb
    .insert(newUser)
    .then(user => {
      userdb.get(user.id)
        .then(foundUser => res.status(201).send(foundUser))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  userdb
    .remove(id)
    .then(user =>
      res.status(200).send(`User with id ${id} deleted sucessfully!`)
    )
    .catch(err => res.status(500).send(err));
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = { name, id };
  userdb
    .update(id, user)
    .then(editedUser => {
      userdb
        .get(id)
        .then(foundUser => res.status(200).send(foundUser))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

module.exports = userRouter;