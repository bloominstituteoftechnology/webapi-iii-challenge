const express = require("express");
const cors = require('cors');
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");
const userDb = require("./data/helpers/userDb");

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({origin: "http://localhost:3000"}));

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: message});
    return;
}

server.get('/api/users', (req, res)=>{
    userDb
        .get()
        .then(users=>{
            res.json({ users });
        })
        .catch(err =>{
            sendUserError(500, "There was an error in retrieving users information");
        });
});

server.get('/api/posts', (req, res) =>{
    postDb
        .get()
        .then(posts=>{
            res.json({ posts })
        })
})

server.get('/api/tags', (req, res) =>{
    tagDb
        .get()
        .then(tags =>{
            res.json({tags})
        })
})

server.listen(port, () =>{ console.log(`Server is listening on ${port}`)});