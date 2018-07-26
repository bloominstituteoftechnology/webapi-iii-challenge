const express = require('express')
const server = express();
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

server.use(express.json())

//Users

server.get('/users', async (req, res) => {
    try {
        const users = await userDb.get()
        res.status(200).json(users)
    } catch(err) {
        res.status(400).json({error: "Users not found"})
    }
})

server.get('/users/:id', async(req, res) => {
    try {
        const id = req.params.id
        const userId = await userDb.getUserPosts(id)
        if (userId === undefined) {
            res.status(404).json({error: "The user with that id can't be found."})
        }
        res.status(200).json(userId)
    } catch(err) {
        res.status(404).json({error: 'Users not found.'})
    }
})

// Posts 

server.get('/posts', async (req, res) => {
    try {
        const posts = await postDb.get()
        res.status(200).json(posts)
    } catch(err) {
        res.status(404).json({error: 'Post could not be found.'})
    }
})


server.get('/posts/:id', async (req,res) => {
    try {
        const id = req.params.id
        const postTag = await postDb.getPostTags(id)
        res.status(200).json(postTag)
    } catch(err) {
        res.status(404).json({ error: 'The post with that id could not be found.'})
    }
})

server.post('/posts', async (req, res) => {
    try {
        const { userId, text } = req.body;
        if (userId === undefined || text === underfined) {
            res.status(400).json({error: "UserId or text is missing"})
        }
        const post = await postDb.insert(req.body);
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json({error: "Error posting post."})
    }
})

// Tags


server.listen(8000);