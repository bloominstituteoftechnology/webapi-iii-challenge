const express = require("express");
const userDb = require("../data/helpers/userDb.js");
const postDb = require("../data/helpers/postDb");
const cors = require('cors')

const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't get users " });
    });
});

server.get("/api/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "couldn't get posts" });
    });
});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
  
    userDb
      .get(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: "No user found with that id " });
      });
  });

  server.get("/api/users/:id/all", (req, res) => {
    const { id } = req.params;
  
    userDb
      .getUserPosts(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: "No user found with that id " });
      });
  });


  server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
  
    postDb
      .get(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ error: "No post found with that id " });
      });
  });

server.post("/api/users", (req, res) => {
  try {
    const userData = req.body;
    userDb.insert(userData);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error adding user" });
  }
});

server.post("/api/posts", (req, res) => {
    try {
      const postData = req.body;
      postDb.insert(postData);
      res.status(201).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: "error adding post" });
    }
  });

server.put("/api/users/:id", (req, res) => {
  const userData = req.body;
  userDb
    .update(req.params.id, userData)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating user" });
    });
});

server.put("/api/posts/:id", (req, res) => {
    const postData = req.body;
    postDb
      .update(req.params.id, postData)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: "error updating post" });
      });
  });

server.delete("/api/users/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting user" });
    });
});

server.delete("/api/posts/:id", (req, res) => {
    postDb
      .remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: "error deleting post" });
      });
  });

module.exports = {
  server
};