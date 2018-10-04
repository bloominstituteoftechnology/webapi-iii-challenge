const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");

const port = 7000;
const server = express();

server.use(express.json());

//------------------------------------------------------MIDDLEWARE
const upperCase = (req, res, next) => {
  req.body.text = req.body.text[0].toUpperCase() + req.body.text.slice(1);
  next();
};

const upperCaseName = (req, res, next) => {
  req.body.name = req.body.name[0].toUpperCase() + req.body.name.slice(1);
  next();
};
server.use(cors(), helmet(), morgan("combined"));
//------------------------------------------------------GET ROUTE HANDLERS
server.get("/users", (req, res) => {
  userDb.get().then(users => {
    res.json(users);
  });
});

server.get("/posts", (req, res) => {
  postDb.get().then(posts => {
    res.json(posts);
  });
});

server.get("/tags", (req, res) => {
  tagDb.get().then(tags => {
    res.json(tags);
  });
});

server.get(`/users/posts/:userId`, (req, res) => {  
  const { userId } = req.params;
  userDb.getUserPosts(userId).then(userPosts => {
    res.json(userPosts);
  });
});
//--------------------------------------------------------------POST ROUTE HANDLERS
server.post("/users/posts", upperCase, (req, res) => {
  const { text, userId } = req.body;
  postDb.insert({ text, userId }).then(() => {
    userDb.getUserPosts(userId).then(newUserPosts => {
      res.json(newUserPosts);
    });
  });
});

server.post("/users", upperCaseName, (req, res) => {
  const { name } = req.body;
  userDb.insert({ name }).then(() => {
    userDb.get().then(users => {
      res.json(users)
    });
  });
});

//-------------------------------------------------------------DELETE ROUTE HANDLERS
server.delete("/users/posts/:id/:userId", (req, res) => {
  const { id, userId } = req.params;
  postDb.remove(id).then(() => {
    userDb.getUserPosts(userId).then(newUserPosts => {
      res.json(newUserPosts);
    });
  });
});

//------------------------------------------------------------UPDATE ROUTE HANDLERS
server.put("/users/posts/:id/:userId", (req, res) => {
  const { id, userId } = req.params;
  const { text } = req.body;
  postDb.update(id, { text, userId }).then(() => {
    userDb.getUserPosts(userId).then(newUserPosts => {
      res.json(newUserPosts);
    });
  });
});
//--------------------------------------------------------------------------------------

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running at port: ${port}`);
});
