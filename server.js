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

//endpoint for GET postTags
server.get('/posts/:id/tags', async (req,res) => {
    const id = req.params.id;

    try {
        const response = await postDb.getPostTags(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({message: 'Users information could not be retrieved.', error: error.message})
    }
})

//endpoint for POST user
server.post('/users/', async (req, res) => {
    if (!req.body.name){
        return res.status(400).send({message: 'Please provide name of user.'})
    }

    try {
        const response = await userDb.insert(req.body);
        const newUser = await userDb.get(response.id);
        res.status(200).json(newUser);
    } catch(e) {
        res.status(500).send({message: "There was an error while saving user to the database", error: e.message});
    }
})

//endpoint for POST post
server.post('/posts', async (req, res) => {
    if (!(req.body.text && req.body.userId)) {
        return res.status(400).send({message: "Please provide userId and text for the post." })
    }

    try {
        const response = await postDb.insert(req.body);
        const newPost = await postDb.get(response.id);
        res.status(200).json(newPost);
    } catch(e) {
        res.status(500).send({message: "There was an error while saving post to the database", error: e.message});
    }
})

//endpoint for POST tag
server.post('/tags', async (req, res) => {
    if (!req.body.tag) {
        return res.status(400).send({message: "Please provide tag." })
    }

    try {
        const response = await tagDb.insert(req.body);
        const newTag = await tagDb.get(response.id);
        res.status(200).json(newTag);
    } catch(e) {
        res.status(500).send({message: "There was an error while saving tag to the database", error: e.message});
    }
})

//endpoint for DELETE user
server.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userDb.get(id);
        if (!user) {
            return res.status(404).send({ message: "The user with the specified ID does not exist." })
        }

        await userDb.remove(id);
        res.status(200).json(user);
    } catch(e) {
        res.status(500).send({message: "The user could not be removed.", error: error.message})
    }
})

server.listen(8000, () => console.log('\n=== API Running... ===\n'))