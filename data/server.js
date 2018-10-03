const express = require("express");
const cors = require("cors");
const posts = require("./data/helpers/postDb");
const users = require("./data/helpers/userDb");
const tags = require(".data/helpers/tagDb");
const port = 3333;
const server = express();
server.use(express.json());
server.use(cors({}));

const errorHelper = (status, message, res) => {
  res.status(status.json({ error: message }));
};

const nameCheck = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, "Name must be added", res);
    next();
  }
};

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(getUsers => {
      res.json(getUsers);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.post("/api/users", nameCheck, (req, res) => {
  const { name } = req.body;
  users
    .insert({ name })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(getUsers => {
      res.json(getUsers);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.post("/api/users/:id", (req, res) => {
  const { id } = req.body;
  users
    .get(id)
    .then(user => {
      if (user === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      }
      res.json(user);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});

server.get("/api/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  users
    .getUserPosts(userId)
    .then(usersPosts => {
      if (usersPosts === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      }
      res.json(usersPosts);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(userRemoved => {
      if (userRemoved === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      } else {
        res.json({ success: "User Removed" });
      }
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.put("/api/users/:id", nameCheck, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users
    .update(id, { name })
    .then(response => {
      if (response === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      } else {
        db.find(id).then(user => {
          res.json(user);
        });
      }
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.get("/api/posts", (req, res) => {
  posts
    .get()
    .then(getPosts => {
      res.json(getPosts);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(post => {
      if (post === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      }
      res.json(post);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.get("/api/posts", (req, res) => {
  posts
    .get()
    .then(getPosts => {
      res.json(getPosts);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;
  posts
    .insert({ userId, text })
    .then(respons => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.get("/api/posts/tags/:id", (req, res) => {
  const { id } = req.params;
  posts
    .getPostTags(id)
    .then(postTags => {
      if (postTags === 0) {
        return errorHelper(404, "No post found", res);
      }
      res.json(postTags);
    })
    .catch(err => {
        return errorHelper(500, "Internal Server Error", res);
    });
});



server.listen(port, () => console.log(`Server listening on ${port}`));
