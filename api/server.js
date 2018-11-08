const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const upperCase = require("../upperCase/upperCase.js");
const postDb = require('../data/helpers/postDb');
const userDb = require('../data/helpers/userDb');

const server = express();

//Middleware Stuffage
server.use(express.json());
server.use(helmet()); 
server.use(morgan('dev'));//does it matter what one we use at all?

// server.use(upperCase);

//Server Code

server.get('/', (req, res) => {
    res.status(200).json({ api: 'it is running properly ' });
});

//users .gets 
server.get('/api/users',(req,res)=>{
    userDb.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json("can not find the users ",error)
        })
});

server.get("/api/users/:id",(req,res)=>{
    const { id } = req.params;

    userDb.get(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json("Can not get the users ", error)
        })
})

//posts .gets
server.get('/api/posts',(req,res)=>{
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json("can not find the posts ",error)
        })
});

server.get("/api/posts/:id",(req,res)=>{
    const { id } = req.params;

    postDb.get(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json("Can not get the users ", error)
        })
})

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
});

// Posts post section

server.post('/api/posts', async (req, res) => {
    console.log('body', req.body);
    try {
        const postData = req.body;
        const postId = await postDb.insert(postData);
        const post = await postDb.get(postId.id);
        res.status(201).json(post);
    } catch (error) {
        let message = 'error creating the post';

        if (error.errno === 19) {
            message = 'please provide both the title and the text section';
        }

        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});
// server.get('/secret', gatekeeper, (req, res) => {
//     res.send(req.welcomeMessage);
//   });   how he did it

module.exports=server;