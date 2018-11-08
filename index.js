const express = require("express");
const server = express();
const uppercase = require("./middleware/uppercase.js");
const cors = require("cors");

const postDB = require("./data/helpers/postDb.js");
const userDB = require("./data/helpers/userDb.js");
const tagDB = require("./data/helpers/tagDb.js");

const port = process.env.PORT || 9000;
const productsRouter = require("./products/productsRouter");

server.use(express.json());
server.use(cors());

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

// C R E A T E  a  U S E R  with  U P P E R C A S E  M I D D L E W A R E
server.post("/user", uppercase, (req, res) => {
  userDB
    .insert(req.body)
    .then(userData => {
      res.status(201).json(userData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error creating the user", err });
    });
});

// C R E A T E  P O S T
server.post("/posts", (req, res) => {
  postDB
    .insert(req.body)
    .then(postData => {
      res.status(201).json(postData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error creating the post." });
    });
});

// U P D A T E  P O S T  by  I D
server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDB
    .update(id, changes)
    .then(post => {
      res.status(200).json({ message: "Post updated successfully." });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error modifying your post.", err });
    });
});

// D E L E T E   P O S T  by  I D
server.delete("/posts/:id", (req, res) => {
  postDB.remove(req.params.id).then(post => {
    res.status(200).json({ message: "Post deleted successfully." });
  });
});

server.use("/products", productsRouter);

server.listen(port, () => console.log("server be runnin: port 9000"));
