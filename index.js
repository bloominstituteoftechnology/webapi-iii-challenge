const express = require("express");
const server = express();
server.use(express.json());

const postDB = require("./data/helpers/postDb.js");
const userDB = require("./data/helpers/userDb.js");
const tagDB = require("./data/helpers/tagDb.js");

server.use(express.json());

// R O O T
server.get("/", (req, res) => {
  res.status(200).send("<h1>THIS IS THE <em>root directory</em></h1>");
});

// G E T  A L L  P O S T S
server.get("/posts/all", (req, res) => {
  postDB
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ message: "Cannot retrieve posts" }));
  userDB;
});

// G E T   P O S T S   by   U S E R   I D
server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id).then(posts => {
    res.status(200).json(posts);
  });
});

// C R E A T E   P O S T
server.post("/posts", async (req, res) => {
  try {
    const postData = req.body;
    const postId = await postDB.insert(postData);
    console.log("post:", postData.title);

    res.status(201).json(postId);
  } catch (error) {
    res.status(500).json({ message: "error creating post" });
  }
});

// G E T  T A G S  by  P O S T  I D
server.get("/posts/tags/:id", (req, res) => {
  const { id } = req.params;
  tagDB.getPostTags(id).then(posts => {
    res.status(200).json(posts);
  });
});

server.listen(9000, () => console.log("server be runnin: port 9000"));
