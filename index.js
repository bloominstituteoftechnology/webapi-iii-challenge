const express = require("express");
const server = express();
server.use(express.json());

const postDB = require("./data/helpers/postDb.js");
const userDB = require("./data/helpers/userDb.js");
const tagDB = require("./data/helpers/tagDb.js");

// # R00T
server.get("/", (req, res) => {
  res.status(200).send("<h1>THIS IS THE <em>root directory</em></h1>");
});

// # GET ALL POSTS
server.get("/posts/all", (req, res) => {
  postDB
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ message: "Cannot retrieve posts" }));
  userDB;
});

// # GET POSTS BY USERID
server.get("/posts/user/:id", (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id).then(user => {
    res.status(200).json(user);
  });
});

// # GET POST BY ID
server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDB.get(id).then(post => {
    res.status(200).json(post);
  });
});

// server.post("/posts", async (req, res) => {
//   try {
//     const postData = req.body;
//     const postId = await postDB.insert(postData);
//     console.log("post:", postData.title);
//      res.status(201).json(postId);
//   } catch (error) {
//     res.status(500).json({ message: "error creating post" });
//   }
// });

// # GET TAGS BY P0ST ID
server.get("/posts/tags/:id", (req, res) => {
  const { id } = req.params;
  tagDB.getPostTags(id).then(posts => {
    res.status(200).json(posts);
  });
});

// # DELETE POST BY ID
server.delete("/posts/:id", (req, res) => {
  postDB.remove(req.params.id).then(post => {
    res.status(200).json({ message: "Post deleted successfully" });
  });
});



server.listen(9000, () => console.log("server be runnin: port 9000"));