const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
// const userDb = require('./data/helpers/userDb.js');
const userRoutes = require('./ServerRoutes/userRoutes');
const express = require('express');

//start server
const server = express();
//use middleware
server.use(express.json());
server.use(uppercaseTag);

//middleware to capitalize tags
function uppercaseTag(req, res, next) {
    if (req.method === 'GET' && req.url.includes('/tags')) {
        let tags = res.json;
        
        res.json = function (data) {
            // data(or argument[0]) contains the response body
            data.length > 1 
            ? data.forEach(tag => tag.tag = tag.tag.toUpperCase())
            : data.tag = data.tag.toUpperCase();
            tags.apply(res, arguments);
        }
    } else if (req.method === 'GET' && !req.url.includes('users') && req.url.includes('/posts')) {
        let tags = res.json;

        res.json = function (data) {
            // data(or argument[0]) contains the response body
            data.tags = data.tags.map(tag => tag.toUpperCase())
            tags.apply(res, arguments);
        }
    }

    next();
}

server.use('/users', userRoutes);

//endpoint for GET posts
server.get('/posts', async (req, res) => {
    try {
        const response = await postDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Posts information could not be retrieved.' })
    }
})

//endpoint for GET posts with id
server.get('/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await postDb.get(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Posts information could not be retrieved.' })
    }
})

//endpoint for GET tags
server.get('/tags', async (req, res) => {
    try {
        const response = await tagDb.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Tags information could not be retrieved.' })
    }
})

//endpoint for GET tags with id
server.get('/tags/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await tagDb.get(id);

        if (!response) {
            return res.status(404).send({ message: "The tag with the specified ID does not exist." })
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error: 'Tags information could not be retrieved.' })
    }
})


//endpoint for GET postTags
server.get('/posts/:id/tags', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await postDb.getPostTags(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ message: 'Users information could not be retrieved.', error: error.message })
    }
})

//endpoint for POST user
server.post('/users', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: 'Please provide name of user.' })
    }

    try {
        const response = await userDb.insert(req.body);
        const newUser = await userDb.get(response.id);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).send({ message: "There was an error while saving user to the database", error: e.message });
    }
})

//endpoint for POST post
server.post('/posts', async (req, res) => {
    if (!(req.body.text && req.body.userId)) {
        return res.status(400).send({ message: "Please provide userId and text for the post." })
    }

    try {
        const response = await postDb.insert(req.body);
        const newPost = await postDb.get(response.id);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).send({ message: "There was an error while saving post to the database", error: e.message });
    }
})

//endpoint for POST tag
server.post('/tags', async (req, res) => {
    if (!req.body.tag) {
        return res.status(400).send({ message: "Please provide tag." })
    }

    try {
        const response = await tagDb.insert(req.body);
        const newTag = await tagDb.get(response.id);
        res.status(200).json(newTag);
    } catch (error) {
        res.status(500).send({ message: "There was an error while saving tag to the database", error: e.message });
    }
})

//endpoint for DELETE post
server.delete('/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const post = await postDb.get(id);
        await postDb.remove(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send({ message: "The post could not be removed.", error: error.message })
    }
})

//endpoint for DELETE tag
server.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const tag = await tagDb.get(id);
        if (!tag) {
            return res.status(404).send({ message: "The tag with the specified ID does not exist." })
        }

        await userDb.remove(id);
        res.status(200).json(tag);
    } catch (errore) {
        res.status(500).send({ message: "The tag could not be removed.", error: error.message })
    }
})

//endpoint for PUT post
server.put('/posts/:id', async (req, res) => {
    if ((!req.body.text && !req.body.userId)) {
        return res.status(400).send({ message: "Please provide userId and text for the post." })
    }

    const id = req.params.id;
    const post = req.body;

    try {
        const response = await postDb.update(id, post);
        if (response===0) {
            res.status(404).send({ message: "The post with the specified ID does not exist." });
        } else {
            const newPost = await postDb.get(id);
            res.status(200).json(newPost);
        }
    } catch (error) {
        res.status(500).send({ message: "This post could not be modified.", error: error.message })
    }
})

// endpoint for PUT tag
server.put('/tags/:id', async (req, res) => {
    if (!req.body.tag) {
        return res.status(400).send({ message: 'Please provide name of tag.' })
    }

    const id = req.params.id;
    const tag = req.body;
    try {
        const response = await tagDb.update(id, tag);
        if (response===0) {
            res.status(404).send({ message: "The tag with the specified ID does not exist." });
        } else {
            const newTag = await tagDb.get(id);
            res.status(200).json(newTag);
        }
    } catch (error) {
        res.status(500).send({ message: "This tag could not be modified.", error: error.message })
    }
})

server.use((err, req, res, next) => {
    res.send(err);
})


server.listen(8000, () => console.log('\n=== API Running... ===\n'))