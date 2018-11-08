const express = require("express");
const server = express();
const uppercase = require("./middleware/uppercase.js");

const postDB = require("./data/helpers/postDb.js");
const userDB = require("./data/helpers/userDb.js");
const tagDB = require("./data/helpers/tagDb.js");

const cors = require("cors");
server.use(cors());

server.use(express.json());

const productsRouter = require("./products/productsRouter");
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

server.listen(9000, () => console.log("server be runnin: port 9000"));
