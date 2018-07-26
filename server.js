const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");

const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({}));

const uppercaseTags = (req, res, next) => {
  const { tag } = req.body;
  tag.toUpperCase();
  next();
};

//routing/endpoints

//userDb
server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  userDb
    .getUserPosts(userId)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.post("/api/users", (req, res) => {
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  userDb
    .update(id, { name })
    .then(response => {
      db.find(id).then(user => {
        res.json(user);
      });
    })
    .catch(error => {
      return error;
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(response => {
      res.json({ response: response });
    })
    .catch(error => {
      return error;
    });
});

//postDb
server.get("/api/posts", (req, res) => {
  postDb
    .get()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/posts/tags/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .getPostTags(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;
  postDb
    .insert({ userId, text })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

//tagDb
server.get("/api/tags", uppercaseTags, (req, res) => {
  tagDb
    .get()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/tags/:id", uppercaseTags, (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.listen(8000, () => console.log("\n=== API running... ===\n"));
