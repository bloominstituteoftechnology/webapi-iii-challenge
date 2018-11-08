const express = require("express");
const router = express.Router();
const postDB = require("../data/helpers/postDb");
const userDB = require("../data/helpers/userDb.js");

// G E T  A L L  P O S T S
router.get("/all", (req, res) => {
  postDB
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ message: "Cannot retrieve posts." }));
  userDB;
});

// G E T   A L L   P O S T S   by   U S E R   I D
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id).then(user => {
    res.status(200).json(user);
  });
});

// G E T   P O S T  by  I D
router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDB.get(id).then(post => {
    res.status(200).json(post);
  });
});

// C R E A T E  P O S T
router.post("/", (req, res) => {
  postDB
    .insert(req.body)
    .then(postData => {
      res.status(201).json(postData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error creating the post." });
    });
});

// U P D A T E  P O S T  by  I D
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDB
    .update(id, changes)
    .then(post => {
      res.status(200).json({ message: "Post updated successfully." });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error modifying your post.", err });
    });
});

// D E L E T E   P O S T  by  I D
router.delete("/:id", (req, res) => {
  postDB.remove(req.params.id).then(post => {
    res.status(200).json({ message: "Post deleted successfully." });
  });
});

module.exports = router;
