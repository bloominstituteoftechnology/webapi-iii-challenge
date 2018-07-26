const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const server = express();
const bodyParser = require('body-parser');

server.use(bodyParser.json());

server.get('/users', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Users could not be retrieved.' })
    }
});

server.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userDb.get(id)
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'User could not be retrieved.' })
    }
});

server.post('/users/', async (req, res) => {
    let user = req.body;
    if (!('name') in user) {
        res.status(400).send({ errorMessage: "Please provide a name for the user." });
    }

    try {
        const newUserId = await userDb.insert(user);
        res.status(200).json(newUserId);
    }
    catch (err) {
        res.status(500).json({ error: 'User could not be created.' })
    }

});

server.delete('/users/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const deleted = await userDb.remove(id);
        if (deleted > 0)
            res.status(200).json(deleted);
        else
            res.status(404).json({ error: 'The user with the specified ID could not be found' });
    }
    catch (err) {
        res.status(500).json({ error: 'User could not be deleted' });
    }

})

server.put('/users/:id', async (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    if (!('name') in updatedUser) {
        res.status(400).send({ errorMessage: "Please provide a name for the user." });
    }

    try {
        const updated = await userDb.update(id, updatedUser);
        if (updated > 0)
            res.status(200).json(updated);
        else
            res.status(404).json({ error: 'The user with the specified ID could not be found' });
    }

    catch (err) {
        res.status(500).json({ error: 'User could not be updated' });
    }
})

server.get('/posts', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Posts could not be retrieved.' })
    }
});

server.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postDb.get(id)
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: 'Post could not be retrieved.' })
    }
});

server.post('/posts/', async (req, res) => {
    let post = req.body;
    if (!('text') in post || !('userId') in post) {
        res.status(400).send({ errorMessage: "Please provide a userId and text for the user." });
    }

    try {
        const newPost= await postDb.insert(post);
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(500).json({ error: 'Post could not be created.' })
    }
});

server.delete('/posts/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const deleted = await postDb.remove(id);
        if (deleted > 0)
            res.status(200).json(deleted);
        else
            res.status(404).json({ error: 'The post with the specified ID could not be found' });
    }
    catch (err) {
        res.status(500).json({ error: 'Post could not be deleted' });
    }

})

server.put('/posts/:id', async (req, res) => {
    let id = req.params.id;
    let updatedPost = req.body;
    if (!('text') in updatedPost || !('userId') in updatedPost) {
        res.status(400).send({ errorMessage: "Please provide text and userId for the post." });
    }

    try {
        const updated = await postDb.update(id, updatedPost);
        if (updated > 0)
            res.status(200).json(updated);
        else
            res.status(404).json({ error: 'The post with the specified ID could not be found' });
    }

    catch (err) {
        res.status(500).json({ error: 'Post could not be updated' });
    }
})

server.get('/tags', async (req, res) => {
    try {
        const tags = await tagDb.get();
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json({ error: 'Tags could not be retrieved.' })
    }
});

server.get('/tags/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const tag = await tagDb.get(id)
        res.status(200).json(tag);
    }
    catch (err) {
        res.status(500).json({ error: 'Tag could not be retrieved.' })
    }
});

server.post('/tags/', async (req, res) => {
    let tag = req.body;
    if (!('tag') in tag) {
        res.status(400).send({ errorMessage: "Please provide a tag." });
    }

    try {
        const newTag = await tagDb.insert(tag);
        res.status(200).json(newTag);
    }
    catch (err) {
        res.status(500).json({ error: 'Tag could not be created.' })
    }
});

server.delete('/tags/:id', async(req,res) => {
    let id = req.params.id;

    try {
        const deleted = await tagDb.remove(id);
        if (deleted > 0)
            res.status(200).json(deleted);
        else
            res.status(404).json({ error: 'The tag with the specified ID could not be found' });
    }
    catch (err) {
        res.status(500).json({ error: 'Tag could not be deleted' });
    }
    
});

server.put('/tags/:id', async (req, res) => {
    let id = req.params.id;
    let updatedTag = req.body;
    if (!('tag') in updatedTag) {
        res.status(400).send({ errorMessage: "Please provide an updated tag." });
    }

    try {
        const updated = await tagDb.update(id, updatedTag);
        if (updated > 0)
            res.status(200).json(updated);
        else
            res.status(404).json({ error: 'The tag with the specified ID could not be found' });
    }

    catch (err) {
        res.status(500).json({ error: 'Tag could not be updated' });
    }
})

server.get('/posts/:id/tags', async (req, res) => {
    let id = req.params.id;
    try {
        const tags = await postDb.getPostTags(id)
        res.status(200).json(tags);
    }
    catch (err) {
        res.status(500).json({ error: `Post's tags could not be retrieved.` })
    }
    
})

server.get('/users/:id/posts', async (req, res) => {
    let id = req.params.id;
    try {
        const posts = await userDb.getUserPosts(id)
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ error: `User's posts could not be retrieved.` })
    }
    
})
server.listen(8000, () => console.log('API running on port 8000'));