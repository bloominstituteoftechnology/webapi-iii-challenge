const express = require('express')
const server = express();
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

server.use(express.json())

server.get('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.params.id)
        const posts = await postDb.get(id)
        res.status(200).json(posts);
    } catch(err) {

    }
})

server.get('/post/tag/:id', async (req,res) => {
    try {
        const id = req.params.id
        console.log(id)
        const postTag = await postDb.getPostTags(id)
        res.status(200).json(postTag)
    } catch(err) {

    }
})




server.listen(8000);