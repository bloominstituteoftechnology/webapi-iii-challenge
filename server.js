const postDb =require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb =require('./data/helpers/userDb.js');
const express = require('express');

//start server
const server= express();

//use middleware
server.use(express.json());

server.get('/users/', async (req,res) => {
    try {
        const response = await userDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Users information could not be retrieved.'})
    }
})

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

server.get('/posts/', async (req,res) => {
    try {
        const response = await postDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Posts information could not be retrieved.'})
    }
})

server.get('/posts/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const response = await postDb.get(id);
        
        if (!response) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." })
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Posts information could not be retrieved.'})
    }
})

server.get('/tags/', async (req,res) => {
    try {
        const response = await tagDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Tags information could not be retrieved.'})
    }
})

server.get('/tags/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const response = await tagDb.get(id);
        
        if (!response) {
            return res.status(404).send({ message: "The tag with the specified ID does not exist." })
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Tags information could not be retrieved.'})
    }
})

server.listen(8000, () => console.log('\n=== API Running... ===\n'))