const express = require('express');
const cors = requite('cors');
// database helpers
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());

// const uppercaseMiddleWare = () => {

// }

// server.get('/api/users')
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (name.length < 1 || name.length > 128) {
        res.status(400).json({error: 'Please provide a name that is between 1 and 128 characters long.'});
        return;
    }
    users 
        .insert(name)
        .then(response => {
            users.findById(response.id).then(user => {
                res.status(201).json({user})
            })
        })
        .catch(err => {
            res.status(500).json({error: 'There was an error while saving user to database'});
            return;
        });
});

// server.get('/api/posts')
server.post('/api/posts'), (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    posts
        .insert({text})
        .then(response => {
            posts.findById(response.id).then(post => {
                res.status(200).json({post})
            })
        })
        .catch(err => {
            res.status(500).json('There was an error saving the post to database')
            return;
        })
}


// server.get('/api/tags')
