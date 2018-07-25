const express = require("express");
const server = express();

const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");
const UserDb = require("./data/helpers/userDb.js");


server.use(express.json());


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


server.listen(8000, () => {console.log("Server is listening on port 8000")})
