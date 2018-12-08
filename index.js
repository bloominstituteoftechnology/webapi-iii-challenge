//server setup

const express = require('express');

const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

const server = express();
const PORT = 4000;

//middleware

server.use(express.json());

//custom middleware

server.use((req, res, next) => {
    const name = req.body.name;
    if(name) {
        req.body.name = name.toUpperCase();
    } 
    next();
})

//endpoints

server.get('/api/posts', (req, res) => {
    postDB.get()
        .then(response => {
            res
                .status(200)
                .json(response);
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "Posts could not be retreived." })
        })
})



//listen

server.listen(PORT, err => {
    console.log(`listening on port ${PORT}`)
})