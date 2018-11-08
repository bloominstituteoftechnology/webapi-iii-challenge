const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');
const tagDb = require('../data/helpers/tagDb.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// ***** GET user by user id *****
// User exists --> respond user object
// User doesn't exist --> error
server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The user information could not be retrieved.' })
        })
});

// ***** GET posts by user id *****
// User exists --> respond posts for user id
// User doesn't exist --> error
server.get('/users/:id/posts', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if (user) {
                return userDb.getUserPosts(req.params.id);
            } else {
                res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` })
            }
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: `The posts for user ${req.params.id} could not be retrieved.` })
        });
});

// ***** GET post by post id *****
// Post exists --> respond post by id
// Post doesn't exist --> error
server.get('/posts/:id', (req, res) => {
    postDb.get(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: `The post with id ${req.params.id} could not be retrieved. This may be due to the post not existing.` })
        })
})

// ***** GET tags for post by post id *****
// Post exists --> respond tags for post by post id
// Post doesn't exist --> error
server.get('/posts/:id/tags', (req, res) => {
    postDb.get(req.params.id)
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => {
            res.status(500).json({ error: `The tags for the post with id ${req.params.id} could not be retrieved. This may be due to the post not existing.` })
        });
})

// ***** GET tag by tag id *****
// Tag exists --> respond tags by tag id
// Tag doesn't exist --> error
server.get('/tags/:id', (req, res) => {
    tagDb.get(req.params.id)
        .then(tag => {
            if (tag) {
                res.status(200).json(tag);
            } else {
                res.status(404).json({ error: `The tag with id ${req.params.id} does not exist.`})
            }
        })
        .catch(err => {
            res.status(500).json({ error: `The tag with id ${req.params.id} could not be retrieved.` })
        });
})


module.exports = server;