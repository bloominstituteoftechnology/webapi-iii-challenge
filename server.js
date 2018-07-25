const postDb =require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb =require('./data/helpers/userDb.js');
const express = require('express');

//start server
const server= express();

//use middleware
server.use(express.json());

//endpoint for GET users
server.get('/users/', async (req,res) => {
    try {
        const response = await userDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Users information could not be retrieved.'})
    }
})

//endpoint for GET user with id
server.get('/users/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const response = await userDb.get(id);
        
        if (!response) {
            return res.status(404).send({ message: "The user with the specified ID does not exist." })
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Users information could not be retrieved.'})
    }
})

//endpoint for GET posts
server.get('/posts/', async (req,res) => {
    try {
        const response = await postDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Posts information could not be retrieved.'})
    }
})

//endpoint for GET posts with id
server.get('/posts/:id', async (req,res) => {
    const id = req.params.id;
    
    try {
        const response = await postDb.get(id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Posts information could not be retrieved.'})
    }
})

//endpoint for GET tags
server.get('/tags/', async (req,res) => {
    try {
        const response = await tagDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Tags information could not be retrieved.'})
    }
})

//endpoint for GET tags with id
server.get('/tags/:id', async (req,res) => {
    const id = req.params.id;

    try {
        const response = await tagDb.get(id);
        
        if (!response) {
            return res.status(404).send({ message: "The tag with the specified ID does not exist." })
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Tags information could not be retrieved.'})
    }
})

//endpoint for GET userposts
server.get('/users/:id/posts', async (req,res) => {
    const id = req.params.id;

    try {
        const response = await userDb.getUserPosts(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({message: 'Users information could not be retrieved.', error: error.message})
    }
})

server.get('/posts/:id/tags', async (req,res) => {
    const id = req.params.id;

    try {
        const response = await postDb.getPostTags(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({message: 'Users information could not be retrieved.', error: error.message})
    }
})

server.listen(8000, () => console.log('\n=== API Running... ===\n'))