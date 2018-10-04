const express = require("express");
const userDB = require("../data/helpers/userDb");
const router = express.Router();

// MIDDLEWARES

const upperCase = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  } else {
  }
  next();
};

// USER ROUTES
// get users
router.get("/", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//get one users posts
router.get("/:id", (req, res) => {
  userDB
    .getUserPosts(req.params.id)
    .then(userposts => {
      res.status(200).json(userposts);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//add user
router.post("/", upperCase, (req, res) => {
  const { id, name } = req.body;
  const newUser = { id, name };
  userDB
    .insert(newUser)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = userDB.getUserPosts(id);
  if (foundUser) {
    userDB
      .remove(id)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(500).json({ error: "ERROROROR" }));
  }
});

//edit user
router.put("/:id", upperCase, (req, res) => {
  userDB
    .update(req.params.id, req.body)
    .then(posts =>
      res.json(posts).catch(err => res.status(500).json({ error: "ERROROROR" }))
    );
});

module.exports = router;
