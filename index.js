const express = require("express");
const server = express();

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
server.listen(8000, () => {console.log("Server is listening on port 8000")})
