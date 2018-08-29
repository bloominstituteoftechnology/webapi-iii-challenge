const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

const dbUsers = require("./data/helpers/userDb.js");
const dbPosts = require("./data/helpers/postDb.js");

server.use(express.json());
server.use(helmet());
server.use(morgan());

function upperCase( req, res, next) {
    const name = req.body.name.toUpperCase();
    if (name !== name.toUpperCase()) {
        res.status(400).json({message: "Name is not in upper case"})
    } else{
        next();
    }
};

server.get("/", (req, res) => {
    res.send("Testing")
});

//USERS
server.get("/users", (req, res) => {
    dbUsers.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => console.log(err));
});

server.get("/users/:id", (req, res) => {
    const {id} = req.params;
    dbUsers.get(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => console.log(err));
})

server.post("/users", upperCase, (req,res) => {
    const name = req.body.name;
    if (!name){
        res.status(400).json({message: "Please enter a name."})
    } 
    else if (name.length > 128) {
        res.status(406).json({message: "Name is too long. Please limit name length to 128 characters or less."})
    } 
    else {
        dbUsers.insert(user)
        .then(response => res.status(200).json(response.id))
        .catch(err => console.log(err));
    }
})

//POSTS
server.get("/posts", (req, res) => {
    dbPosts.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => console.log(err));
});

server.listen(9000, () => console.log("===API on port 9000==="))