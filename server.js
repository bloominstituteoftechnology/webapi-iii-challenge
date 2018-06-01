const express = require('express');
const cors = require('cors');

const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');
const users = require('./data/helpers/userDb.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const tagToUpper = (req, res, next) => {
    req.body.tag = req.body.tag.toUpperCase();
    next();
};

//---------- Get Methods ----------

server.get('/api/users', (req, res) => {
    users.get()
        .then(users => {
            res.json({ users })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/posts', (req, res) => {
    posts.get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/tags', (req, res) => {
    tags.get()
        .then(tags => {
            res.json({ tags })
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Get by ID Methods ----------

server.get('/api/users/:id', (req, res) => {
    let { id } = req.params;
    users.get(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: `No user found with id of ${id}` });
                return;
            }
            res.json({ user })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/posts/:id', (req, res) => {
    let { id } = req.params;
    posts.get(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ errorMessage: `No post found with id of ${id}` });
                return;
            }
            res.json({ post })
        })
        .catch(err => {
            res.json({ errorMessage: `No post found with id of ${id}` })
        })
});

server.get('/api/tags/:id', (req, res) => {
    let { id } = req.params;
    tags.get(id)
        .then(tag => {
            if (!tag) {
                res.status(404).json({ errorMessage: `No tag found with id of ${id}` });
                return;
            }
            res.json({ tag })
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Special Get Methods ----------

server.get('/api/users/:id/posts', (req, res) => {
    let { id } = req.params;
    users.getUserPosts(id)
        .then(posts => {
            if (posts.length === 0) {
                res.status(404).json({ errorMessage: `No posts found under id of ${id}` });
                return;
            }
            res.json({ posts })
        })
        .catch(err => {
            res.json({ err })
        })
})

server.get('/api/posts/:id/tags', (req, res) => {
    let { id } = req.params;
    posts.getPostTags(id)
        .then(tags => {
            if (!tags.length) {
                res.status(404).json({ errorMessage: `No tags found under id of ${id}` });
                return;
            }
            res.json({ tags })
        })
        .catch(err => {
            res.json({ err })
        })
})


//---------- Post Methods ----------

server.post('/api/users', (req, res) => {
    let { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: `Please provide a name for the user` });
        return;
    }
    users.insert({ name })
        .then(idObj => {
            res.json(idObj)
        })
        .catch(err => {
            res.json({ err })
        })
});

server.post('/api/posts/:userId', (req, res) => {
    let { userId } = req.params;
    let { text } = req.body;
    if (!text) {
        res.status(400).json({ errorMessage: `Please provide text for the post` });
        return;
    }
    posts.insert({ text, userId})
        .then(idObj => {
            res.json(idObj)
        })
        .catch(err => {
            res.json({ err })
        })
});

server.post('/api/tags', tagToUpper, (req, res) => {
    let { tag } = req.body;
    if (!tag) {
        res.status(400).json({ errorMessage: `Please provide a tag` });
        return;
    }
    tags.insert({ tag })
        .then(idObj => {
            res.json(idObj)
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Delete Methods ----------

server.delete('/api/users', (req, res) => {
    let { id } = req.body;

    users.remove(id)
        .then(num => {
            if(num === 0) {
                res.status(404).json({ errorMessage: `No user found with id of ${id}` });
                return;
            }
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.delete('/api/posts', (req, res) => {
    let { id } = req.body;
    posts.remove(id)
        .then(num => {
            if(num === 0) {
                res.status(404).json({ errorMessage: `No post found with id of ${id}` });
                return;
            }
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.delete('/api/tags', (req, res) => {
    let { id } = req.body;
    tags.remove(id)
        .then(num => {
            if(num === 0) {
                res.status(404).json({ errorMessage: `No tag found with id of ${id}` });
                return;
            }
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Put Methods ----------

server.put('/api/users/:id', (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: `Please provide a new name for the user` });
        return;
    }
    users.update(id, { name })
        .then(count => {
            res.json({ count })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.put('/api/posts/:id', (req, res) => {
    let { id } = req.params;
    let { userId, text } = req.body;
    if (!text) {
        res.status(400).json({ errorMessage: `Please provide new text for the post` });
        return;
    }
    posts.update(id, { userId, text })
        .then(count => {
            res.json({ count })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.put('/api/tags/:id', tagToUpper, (req, res) => {
    let { id } = req.params;
    let { tag } = req.body;
    if (!tag) {
        res.status(400).json({ errorMessage: `Please provide a new tag` });
        return;
    }
    tags.update(id, { tag })
        .then(count => {
            res.json({ count })
        })
        .catch(err => {
            res.json({ err })
        })
});


server.listen(port, () => console.log(`Server running on port ${port}`));