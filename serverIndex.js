// console.log('success');

const express = require('express');
const cors = require('cors');
// const db = require('./data/postsDB.js');

const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');

const server = express();
const Port = 5000;



server.use(express.json());
server.use(cors());

//custom automatic capitalization of username:
server.use((req, res, next) => {
    const user = req.body.name;
    if(user) {
        req.body.name = user.toUpperCase();
    }
    next();
})

server.get('/api/posts', (req, res) => {
    postDB.get()
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "Posts could not be retrieved." })
        })
    // res.json({message: 'api is running'})
})
server.get('/api/users', (req, res) => {
    userDB.get()
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "Users could not be retrieved." })
        })
})
server.get('/api/posts/:id', (req, res) => {
    console.log(req.params.id)
    postDB.getPostTags(req.params.id)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This posts information could not be retrieved." })
        })
})
server.get('/api/users/:id', (req, res) => {
    // console.log(req.params.id)
    userDB.getUserPosts(req.params.id)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This users information could not be retrieved." })
        })
})

server.post('/api/posts', (req, res) => {
    postDB.insert(req.body)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This post could not be added." })
        })
})
server.post('/api/users', (req, res) => {
    userDB.insert(req.body)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This user could not be added." })
        })
})

server.put('/api/posts/:id', (req, res) => {
    postDB.update(req.params.id, req.body)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This post could not be updated." })
        })
})
server.put('/api/users/:id', (req, res) => {
    userDB.update(req.params.id, req.body)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This user could not be updated." })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    postDB.remove(req.params.id)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This post could not be deleted." })
        })
})
server.delete('/api/users/:id', (req, res) => {
    userDB.remove(req.params.id)
        .then(response => {
            // console.log(response, 'response')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            res
                .status(500)
                .json({error: "This user could not be deleted." })
        })
})



server.listen(Port, () => {
    console.log(`Server at Port ${Port} is up an running!`)
});
