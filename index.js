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

// G E T   A L L   P O S T S   by   U S E R   I D
server.get("/posts/user/:id", (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id).then(user => {
    res.status(200).json(user);
  });
});

// G E T   P O S T  by  I D
server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDB.get(id).then(post => {
    res.status(200).json(post);
  });
});

// G E T  T A G S  by  P O S T  I D
server.get("/posts/tags/:id", (req, res) => {
  const { id } = req.params;
  tagDB.getPostTags(id).then(posts => {
    res.status(200).json(posts);
  });
});

// D E L E T E   P O S T  by  I D
server.delete("/posts/:id", (req, res) => {
  postDB.remove(req.params.id).then(post => {
    res.status(200).json({ message: "Post deleted successfully" });
  });
});

server.listen(9000, () => console.log("server be runnin: port 9000"));
