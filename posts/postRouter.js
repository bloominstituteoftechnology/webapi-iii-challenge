const express = require("express");
const postsdb = require("./postDb.js");
const router = express.Router();

router.get("/", (req, res) => {
    postsdb
      .get()
      .then(posts => {
        res.status(201).json({
          posts
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "no posts"
        });
      });
  });
  
  router.get("/:id", validatePostId, (req, res) => {
    const id = req.params.id;
    postsdb
    .getById(id)
    .then( post => {
        if (post) {
            res.status(200).json({
                post
            });
        } else {
            res.status(404).json({
                message: "cannont find the post"
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: error,
            message: "the post could not be retreived"
        });
    });
  });
  
  router.delete("/:id", validatePostId, (req, res) => {
      postsdb
      .remove(req.params.id)
      .then(response => {
          res.status(200).json({
              message: "post deleted"
          });
      })
      .catch(error => {
          res.status(500).json({
              message: "some other error"
          });
      });
  });
  
  router.put("/:id", validatePostId, (req, res) => {
      const id = req.params.id
      postsdb.update(id, req.body)
      .then(response => {
          res.status(200).json(
              response
          )
      })
      .catch(error => {
          res.status(500).json({
              message: "yet another error"
          });
      })
  
  });
  
  // custom middleware
  
  function validatePostId(req, res, next) {
    const id = req.params.id;
    postsdb
      .getById(id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(400).json({ message: "Invalid Post ID" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  
  module.exports = router;