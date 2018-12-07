// outside resources
const express = require("express");
const postDB = require("../data/helpers/postDb");

// custom files
const custMW = require("../middleware");

// local constants
const router = express.Router();

// global middleware

// route handlers for /posts
// // retreive
router.get("/", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRetreival);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(custMW.badDataRetreival);
    });
});

// // create
// *extra* - add functionality in to compare the posted post's userId with the list of all user IDs to throw an error if a nonuser tries to post
router.post("/", (req, res) => {
  const newPost = req.body;
  if (newPost.userId && newPost.text) {
    postDB
      .insert(newPost)
      .then(id => {
        console.log(id);
        postDB.get(id.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json(custMW.badDataInsert);
      });
  } else {
    res.status(400).json({ message: "missing user name or post text" });
  }
});

// // delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  userDB
    .remove(id)
    .then(num => {
      if (!num) {
        res.status(404).json(custMW.badID);
      } else {
        res.json({ message: "deleted post successfully" });
      }
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRemoval);
    });
});

// // update
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
    if (newPost.userId && newPost.text) {
      postDB
        .update(id, newPost)
        .then(num => {
          if (!num) {
            res.status(404).json(custMW.badID);
          } else {
            postDB.get(id).then(post => {
              res.json(post);
            });
          }
        })
        .catch(err => {
          res.status(500).json(custMW.badDataUpdate);
        });
    } else {
      res.status(400).json({ message: "missing user name or post text" });
    }
  });
  
// exports
module.exports = router;
