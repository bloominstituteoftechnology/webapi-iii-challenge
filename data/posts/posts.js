const express = require("express");


//PULL IN ROUTER
const router = express.Router();

//IMPORT POSTDB
const postDb = require("../helpers/postDb.js");

//GET ALL POSTS
router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => {
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//GET ALL POST BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(posts => {
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res.json(posts);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//DELETE ALL POSTS WITH THE SAME ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(posts => {
      console.log(posts);
      if (!posts) {
        res.status(404).send({ message: "no posts exist for this id" });
      } else {
        res
          .status(200)
          .send({ message: "You have deleted the posts for this id" });
      }
    })
    .catch(err =>
      res.status(500).send({
        error: "There was an error while deleting the posts from the database"
      })
    );
});

//ADD A POST
router.post("/", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  postDb
    .insert(newPost)
    .then(post => {
      console.log(post);
      console.log(post.id);
      console.log(post.body);
      console.log(req.body);
      if (!post.id) {
        res
          .status(404)
          .send({ errorMessage: "User with that ID could not be found" });
      } else {
        res.status(201).send({ message: `You added ${req.body.text}` });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//EDIT AN EXISTING POST
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const updatedPost = { text };

  postDb
    .update(id, updatedPost)
    .then(posts => {
      console.log("Posts is: " + posts);
      if (!posts) {
        res.status(400).send({ message: "No user exists that id" });
      } else {
        res.status(200).send({ message: "The post has been updated" });
      }
    })
    .catch(err => {
      console.log(`Bohoo you got an ${err}`);
    });
});


//EXPORT POSTS SO INDEX.JS CAN PULL IT IN
module.exports = router;