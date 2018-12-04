const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const PORT = 4100;

//middleware
server.use(express.json());


//route handlers
server.get('/users', (req, res) => {
    userDb.get()
        .then((users) => {
            res.json(users)
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the users. They're hiding."
            })
        })
})

server.get('/posts', (req, res) => {
    postDb.get()
    .then((posts)=>{
        res.json(posts)
    })
    .catch(err => {
        res
        .status(500)
        .json({
            message: "Could not fetch the posts. They're hiding."
        })
    })
})

server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    userDb.getUserPosts(id)
        .then(posts => {
            if(posts) {
                res.json(posts)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not exist. Perhaps search for another."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find those posts."
            })
        })
})



//listening
server.listen(PORT, ()=> {
    console.log(`Server is alive at ${PORT}`);
});