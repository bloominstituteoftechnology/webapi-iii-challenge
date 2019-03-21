const express = require("express");

const Posts = require("./data/helpers/postDb.js");

const Postrouter = express.Router();

Postrouter.get("/", async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (err) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

Postrouter.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The post information could not be retrieved." });
  }
});

// Postrouter.post('/', async (req, res) => {
//     const post = await Posts.insert(req.body);
//     console.log(post);
//     if (post.text) {
//         try {
//             res.status(201).json(post);
//         } catch (err) {
//             console.log(err);
//             res.status(500).json({ error: 'There was an error while saving the post to the database'});
//         }
//     } else {
//         res.status(400).json({
//             errorMessage: 'Plese provide text for the post.'
//         });
//     }
// });

Postrouter.post("/", (req, res) => {
  const newPost = req.body;
  // console.log(newPost);

  if (newPost.text && newPost.user_id) {
    Posts.insert(newPost)
      .then(post => {
        // console.log(post);
        res.status(201).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database "
          });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide the name for the post" });
  }
});

Postrouter.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).end();
    } else {
      res
        .status(404)
        .json({ message: "The post witht the specified ID does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "The post could not be removed" });
  }
});

Postrouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const postChange = req.body;
  console.log(req.body);
  if (postChange.text && postChange.user_id) {
    try {
      const post = await Posts.update(id, postChange);
      if (post) {
        console.log(post);
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    }
  } else {
    res.status(400).json({ errorMessage: "Please provide text for the post." });
  }
});

module.exports = Postrouter;
