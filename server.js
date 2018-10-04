const express = require("express");
const cors = require("cors");
const posts = require("./data/helpers/postDb");
const users = require("./data/helpers/userDb");
const tags = require("./data/helpers/tagDb");
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3333'}));
const port = 3333;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port}===\n`)
);

const serverLogger = (req, res, next) => {
     console.log(`\n\n\nIncoming Request:\n\nurl: ${req.url}\n\nmethod: ${req.method}\n\nbody:`);
     console.log(req.body);
     next();
  
} 
server.use(serverLogger)
const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};

const upperCaseTags = (req, res, next) => {
  // "/api/users/" this has string length of 11
  // if the URL we get has length greater than 11
  // we know that it has a valid parameter at the end
  if ((req.method == "PUT" && req.url.includes("/api/users/") && req.url.length > 11)
    || (req.method == "POST" && req.url == "/api/users/" && req.body.name))
    req.body.name = req.body.name.toUpperCase();
  next();
}
server.use(upperCaseTags);


server.get("/api/users", (req, res) => {
  users
    .get()
    .then(getUsers => {
      res.json({getUsers});
    })
    .catch(err => {
      console.log(err)
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.post("/api/users", (req, res) => {
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

server.get("/api/users/:id", (req, res) => {
    const {id}=req.params;
  users
    .get(id)
    .then(user => {
        if (user === 0) {
          
      return errorHelper(404, "No User by that ID", res);
        }
        res.json(user);
    })
    .catch (err =>{
        return errorHelper(500, "Internal Server Error", res );
    
    });
});

server.get("/api/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  users
    .getUserPosts(userId)
    .then(usersPosts => {
      if (usersPosts === 0) {
        return errorHelper(404, "No post", res);
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
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users
    .update(id, { name })
    .then(response => {
      if (response === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      } else {
        res.json(response);
      }
    })
    .catch(err => {
      console.log(err)
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
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(post => {
      if (post === 0) {
        return errorHelper(404, "No post by that Id in the DB", res);
      }
      res.json(post);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});
server.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;
  posts
    .insert({ userId, text })
    .then(response => {
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
server.get('/api/tags', (req, res)=>{
    users.get()
    .then(gotTags=>{
        res.json({gotTags});
    })
    .catch(err =>{
        return errorHelper(500, "Internal Server Error", res );
    });
});




