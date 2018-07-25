// node modules
const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');
const cors = require('cors');

// init server
const server = express();
const port = 8000;
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send('Server running...');
});

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({error: 'The posts information could not be retrieved.'});
    }
});

server.get('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.get(id);
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({error: 'The post with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post information could not be retrieved.'});
    }
});

server.get('/api/postTags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.getPostTags(id);
        if(post[0]) {
            res.status(200).json(post);
        } else {
            res.status(404).json({error: 'The post tag with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post tag information could not be retrieved.'});
    }
});

server.post('/api/posts', async (req, res) => {
    try {
        const post = {...req.body};
        if(!post.userId || !post.text) {
            res.status(400).json({error: 'Please provide userId and text for the post.'});
        } else {
            const newPost = await postDb.insert(post);
            res.status(201).json(post);
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error while saving the post to the database.'});
    }
});

server.put('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = req.body;
        let findPost = await postDb.get(id);
        if(findPost && (post.userId && post.text)) {
            const updatePost = await postDb.update(id, post);
            findPost = await postDb.get(id);
            res.status(200).json(findPost);
        } else if (!findPost) {
            res.status(404).json({error: 'The post with the specified ID does not exist.'});
        } else {
            res.status(400).json({error: 'Please provide userId and text for the user.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post information could not be modified.'});
    }
});

server.delete('/api/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDb.get(id);
        if(post) {
            const delPost = await postDb.remove(id);
            res.status(200).json(post);
        } else {
            res.status(404).json({error: 'The post with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The post could not be removed.'});
    }
});

server.listen(port, () => console.log(`Server running @ localhost:${port}`));
