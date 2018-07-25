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

// POSTS CRUD operations
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

// TAGS CRUD operations
server.get('/api/tags', async (req, res) => {
    try {
        const tags = await tagDb.get();
        res.status(200).json(tags);
    } catch(err) {
        res.status(500).json({error: 'The tags information could not be retrieved.'});
    }
});

server.get('/api/tags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);
        if(tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({error: 'The tag with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The tag information could not be retrieved.'});
    }
});

server.post('/api/tags', async (req, res) => {
    try {
        const tag = {...req.body};
        if(tag.tag) {
            const newTag = await tagDb.insert(tag);
            res.status(201).json(tag);
        } else {
            res.status(400).json({error: 'Please provide tag for the tag.'});
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error while saving the tag to the database.'});
    }
});

server.put('/api/tags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = req.body;
        let findTag = await tagDb.get(id);
        if(findTag && (tag.tag)) {
            const updateTag = await tagDb.update(id, tag);
            findTag = await tagDb.get(id);
            res.status(200).json(findTag);
        } else if (!findTag) {
            res.status(404).json({error: 'The tag with the specified ID does not exist.'});
        } else {
            res.status(400).json({error: 'Please provide tag for the tag.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The tag information could not be modified.'});
    }
});

server.delete('/api/tags/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);
        if(tag) {
            const delTag = await tagDb.remove(id);
            res.status(200).json(tag);
        } else {
            res.status(404).json({error: 'The tag with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The tag could not be removed.'});
    }
});

// USERS CRUD operations
server.get('/api/users', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({error: 'The users information could not be retrieved.'});
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'The user with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The user information could not be retrieved.'});
    }
});

server.post('/api/users', async (req, res) => {
    try {
        const user = {...req.body};
        if(user.name) {
            const newUser = await userDb.insert(user);
            res.status(201).json(user);
        } else {
            res.status(400).json({error: 'Please provide name for the user.'});
        }
    } catch(err) {
        res.status(500).json({error: 'There was an error while saving the user to the database.'});
    }
});

server.put('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.body;
        let findUser = await userDb.get(id);
        if(findUser && (user.name)) {
            const updateUser = await userDb.update(id, user);
            findUser = await userDb.get(id);
            res.status(200).json(findUser);
        } else if (!findUser) {
            res.status(404).json({error: 'The user with the specified ID does not exist.'});
        } else {
            res.status(400).json({error: 'Please provide name for the user.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The user information could not be modified.'});
    }
});

server.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);
        if(user) {
            const delUser = await userDb.remove(id);
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'The user with the specified ID does not exist.'});
        }
    } catch(err) {
        res.status(500).json({error: 'The user could not be removed.'});
    }
});

server.listen(port, () => console.log(`Server running @ localhost:${port}`));
