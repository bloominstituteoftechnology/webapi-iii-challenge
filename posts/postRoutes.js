const express = require("express");

const posts = require("../data/helpers/postDb.js");

const router = express.Router();



// CRUD //

// this router handles anything that begins with /posts

// GET all posts
router.get("/", (req, res) => {
    posts
      .get()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "The posts could not be retrieved." });
      });
  });


// GET post by ID
router.get("/:id", (req, res) => {
    posts
      .get(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(err => {
        console.log("Error: ", err);
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });

// PUT 
router.put("/:id", (req, res) => {
    if (req.body.text) {
      posts
        .update(req.params.id, req.body)
        .then(post => {
          if (post) {
            res.status(200).json(post);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
          }
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The post information could not be modified." })
        );
    } else {
      res.status(400).json({
        errorMessage: "Please provide some text for the post."
      });
    }
  });

// POST 
router.post("/", (req, res) => {
    const post = req.body;
    posts
      .insert(post)
      .then(response => {
        if (post.text) {
          res.status(201).json({ message: "post created successfully" });
        } else {
          res.status(404).json({ message: "post needs some text " });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
      );
  });
  

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    posts
    .remove(id)
    .then(flag => {
        if (flag > 0) res.json(id);
        else {
            res.status(404).json({errorMessage: "That post does not exist"});
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error deleting the post"});
    })
})


module.exports = router;
