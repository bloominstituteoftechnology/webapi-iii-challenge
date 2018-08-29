const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

const dbUsers = require("./data/helpers/userDb.js");
const dbPosts = require("./data/helpers/postDb.js");

server.use(express.json());
server.use(helmet());
server.use(morgan());

server.get("/", (req, res) => {
    res.send("Testing")
});

server.get("/users", (req, res) => {
    dbUsers.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => console.log(err));
});

server.post("/users", (req,res) => {
    const user = req.body;
    if (!user.name){
        res.status(400).json({message: "Please enter a name."})
    } else {
        dbUsers.insert(user)
        .then(response => res.status(200).json(response.id))
        .catch(err => console.log(err));
    }
})

server.get("/posts", (req, res) => {
    dbPosts.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => console.log(err));
});

server.listen(9000, () => console.log("===API on port 9000==="))