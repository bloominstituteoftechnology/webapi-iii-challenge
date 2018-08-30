const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const tagsDb = require("./data/helpers/tagDb");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(errorHandler);

const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};

function upperCase(req, res, next) {
  req.body.upper = req.body.title.toUpperCase();
  next();
}
/////Middleware
const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, "Name must be included", res);
    next();
  } else {
    next();
  }
};
/////EndPoints
server.get("/", (req, res) => {
  res.send("Hello World");
});
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error Getting Data" });
    });
});
server.get("/users", nameCheckMiddleware, (req, res) => {
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error Getting MiddleWare" });
    });
});
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user === 0) {
        return errorHelper(404, "No user by that Id in the DataBase", res);
      }
      res.json(user);
    })
    .catch(err => {
      return errorHelper(500, "Database", res);
    });
});

server.get("/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  userDb
    .getUserPosts(userId)
    .then(posts => {
      if (posts === 0) {
        return errorHelper(404, "NO POSTS", res);
      }
      res.json(posts);
    })
    .catch(err => {
      return errorHelper(500, "Database", res);
    });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(removed => {
      if (removed === 0) {
        return errorHelper(404, "No User With That ID");
      } else {
        res.json({ success: "User Removed" });
      }
    })
    .catch(err => {
      return errorHelper(500, "Database", res);
    });
});

server.put("/users/:id", nameCheckMiddleware, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  userDb
    .update(id, { name })
    .then(response => {
      if (response === 0) {
        return errorHelper(404, "No user with that id");
      } else {
        db.find(id).then(user => {
          res.json(user);
        });
      }
    })
    .catch(err => {
      return errorHelper(500, "Database", res);
    });
});

server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      return errorHelper(500, "Posts Not Found", res);
    });
});

server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post === 0) {
        return errorHelper(404, "No posts by id", res);
      }
      res.json(post);
    })
    .catch(err => {
      return errorHelper(500, "Error", res);
    });
});

server.post("/posts", upperCase, (req, res) => {
  const { userId, text } = req.body;
  const upperCased = req.body.upper;
  console.log(upperCase);
  postDb
    .insert({ userId, text, title: upperCased })
    .then(newPost => {
      res.status(200).json(newPost, req.body.upper);
    })
    .catch(err => {
      return errorHelper(500, "Error", res);
    });
});

server.get("/post/tags/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .getPostTags(id)
    .then(tags => {
      if (tags === 0) {
        return errorHelper(404, "Post Not Found", res);
      }
      res.json(tags);
    })
    .catch(err => {
      return errorHelper(500, "Error", res);
    });
});

server.get("/tags", (req, res) => {
  userDb
    .get()
    .then(tag => {
      res.status(200).json({ tag });
    })
    .catch(err => {
      return errorHelper(500, "Error", res);
    });

  server.get("/download", (req, res, next) => {
    const filePath = path.join(__dirname, "index.html");
    res.sendFile(filePath, err => {
      if (err) {
        next(err);
      } else {
        console.log("File sent successfully");
      }
    });
  });
});
server.listen(3001, () => console.log("server 3001 started"));

function errorHandler(err, req, res, next) {
  console.error(err);

  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: "The requested file does not exist."
      });

      break;

    default:
      res.status(500).json({
        message: "There was an error performing the required operation"
      });
      break;
  }
}
