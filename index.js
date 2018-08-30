const express = require("express");
const server = express();
// databases
const userRoutes = require("./users/userRoutes.js");
const postDB = require("./data/helpers/postDb.js");

// causes express middleware
// stack to be added to every layer (request function)
server.use(express.json());

// must be used when using express Router
// links url with requests
server.use("/users", userRoutes);

//////////////================================= START POSTDB REQUESTS =================================//////////////
// GET REQUESTS
server.get("/posts", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        return res.status(200).json({ post });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});
// end GETS //

// POST REQUEST //
//// MUST BE ID OF EXISTING USER ////
server.post("/posts", async (req, res) => {
  const post = req.body;
  if (!post.userId || !post.text) {
    return res.status(400).json({
      errorMessage: "Please provide the correct User ID and text.",
    });
  } else {
    try {
      const response = await postDB.insert(post);
      res.status(201).json({ message: "New post created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database.",
      });
    }
  }
});
// end POST //

// DELETE REQUEST //
server.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postDB.remove(id);
    if (response === 0) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    } else {
      return res.status(200).json({ message: "Post deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      error: "The post could not be removed.",
    });
  }
});
// end DELETE //

// PUT REQUEST //
server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!post.userId || !post.text) {
    return res.status(400).json({
      errorMessage: "Please provide the correct User ID and text.",
    });
  } else {
    postDB
      .update(id, post)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "Post successfully modified." });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  }
});
// end PUT //

//////////////================================= END POSTDB REQUESTS =================================//////////////

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
