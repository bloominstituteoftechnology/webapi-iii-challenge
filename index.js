const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const server = express();

const userRouter = require('./users/userRouter.js');

// MIDDLEWARES

const allCaps = (req, res, next) => {
    console.log(req.body);
  
    Object.assign(req.body, { name: req.body.name.toUpperCase() });
  
    next();
  };


server.use(morgan("dev"), cors(), helmet(), express.json());
   
//=============== USER ENDPOINTS =============== //
server.use('/api/users', userRouter);

//=============== POST ENDPOINTS =============== //

//Get all posts
server.get("/api/posts", (req, res) => {
    postDb
      .get()
      .then(post => {
        res.json(post);
      })
      .catch(err =>
        res.status(500).json({
          error: "The post information could not be retrieved."
        })
      );
  });
  
//Add a new post
server.post("/api/posts/", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  if (!text || !userId) {
    return res.status(400).json({ error: "Please provide text to your post." });
  }
  postDb
    .insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error saving your post."
      });
    });
});

//Delete a post
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(post => {
      if (post.length < 1) {
        res.status(404).json({
          message: "The post with that ID does not exist."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The post could not be removed."
      })
    );
});

//Update a post
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const newPost = { text, userId };
  if (!text || !userId) {
    return res
      .status(400)
      .json({ error: "Please provide a userId and text for the post." });
  }
  postDb
    .update(id, newPost)
    .then(post => {
      if (post.length < 1) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The post information could not be modified.."
      })
    );
});


// call server.listen w/ a port of your choosing
server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});