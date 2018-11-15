const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const post = require('../data/helpers/postDb.js');
const tag = require('../data/helpers/tagDb');
const user = require('../data/helpers/userDb');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

const nameUppercase = (req, res, next) => {
    const { name } = req.body;
    if(!name) {
        res.status(500).json({ message: "must have name"})
    } else {
        next();
    }
};
// POST DATA
server.get('/', (req, res) => {
    res.status(200).json({ api: "it runs" });
})

server.get('/post', (req, res) => {
    post.get()
    .then(foundPosts => {
        res.json(foundPosts)
    })
    .catch(err => {
        res.status(500).json({ message: err })
    });
});
server.get('/post/:id', (req, res) => {
    const { id } = req.params;
    post.get(id)
    .then(foundPost => {
        res.json(foundPost)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
server.post('/post', (req, res) => {
    const { userId, text } = req.body;
    post.insert({ userId, text })
    .then(newPost => {
        res.json(newPost)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
server.put('/post/:id', (req, res) => {
    const { id } = req.params;
    const postText = req.body;
    post.update(id, postText)
    .then(count => {
        res.json(count)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
server.delete('/post/:id', (req, res) => {
    const { id } = req.params;
    post.remove(id)
    .then(count => {
        res.json(count)
    })
    .catch( err => {
        res.json({ message: err })
    })
});
// USER DATA
server.get('/user/', (req, res) => {
    user.get()
    .then(foundUser => {
        res.json(foundUser)
    })
    .catch(err => {
        res.json({ message: err })
    })
}),
server.get('/user/:id', (req, res) => {
    const { id } = req.params;
    user.get(id)
    .then(foundUser => {
        res.json(foundUser)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
server.post('/user', (req, res) => {
    const { name } = req.body;
    user.insert({ name })
    .then(newUser => {
        res.json(newUser)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
server.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const name = req.body;
    user.update(id, name)
    .then(count => {
        res.json(count)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
server.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    user.remove(id)
    .then(count => {
        res.json(count)
    })
    .catch( err => {
        res.json({ message: err })
    })
});


module.exports = server;
