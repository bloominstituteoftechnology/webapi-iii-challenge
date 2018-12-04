const express = require("express");
const db = require("../data/helpers/postDb");

const router = express.Router();

// Endpoints
router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get posts." });
    });
});

router.get("/:postId", (req, res) => {
  const { postId } = req.params;
  console.log(req.params);
  db.get(postId).then(post => {
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Failed to get post." });
    }
  });
});

router.post("/", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };

  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.get(id).then(post => {
        if (post) {
          res.status(201).json(post);
        } else {
          res.status(400).json({ message: "Missing text or author." });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create post." });
    });
});

module.exports = router;

// get(): calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if found.
// insert(): calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: { id: 123 }.
// update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
