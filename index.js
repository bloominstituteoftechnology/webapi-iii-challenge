const express = require("express");
const server = express();
const bodyParser = require('body-parser')

const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");
const UserDb = require("./data/helpers/userDb.js");


server.use(express.json());

//posts
server.get("/api/posts/", (req, res) => {
  postDb
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            return res.status(500).send({Message: "Server Error"});
        });
});
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
        .get(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            return res.status(500).send({Message: "Server Error"});
        });
});
server.post("/api/posts/", (req, res) => {
  const { text, userId } = req.body;
  console.log(req.body)
  if(text == "" || userId == "") {
      return res.status(400).send({Message: "Must provide a user ID and  text content"});
  }
  postDb
      .insert({text, userId})
      .then(response => {
          res.status(201).json(response);
      })
      .catch(error => {
          return res.status(500).send({Message: "Server Error"});
      });
});
//users
server.get("/api/users/", (req, res) => {
  UserDb
    .get()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      return res.status(500).send({Message: "Server Error"});
    })
})
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  UserDb
    .get(id)
    .then(users => {
      if (users == undefined){
        return res.status(200).send({Message: "User does not exist"});
      }
      res.json(users)
    })
    .catch(error => {
      return res.status(500).send({Message: "Server Error"});
    })
})
//tags
server.get("/api/tags/", (req, res) => {
  tagDb
    .get()
    .then(tags => {
      res.json(tags)
    })
    .catch(error => {
      return res.status(500).send({Message: "Server Error"});
    })
})
server.get("/api/tags/:id", (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tags => {
      if (tags == undefined){
        return res.status(200).send({Message: "Tag does not exist"});
      }
      res.json(tags)
    })
    .catch(error => {
      return res.status(500).send({Message: "Server Error"});
    })
})


server.listen(8000, () => {console.log("Server is listening on port 8000")})
