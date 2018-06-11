const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');
const express = require('express');
const cors = require('cors');
const server = express();
const port = 5000;

server.use(express.json());
server.use(cors({orgin: 'http://localhost:3000'}));

server.get('/api/users'), (req, res) => {
    users
    .get()
    .then(users => {
        res.json({users})
    })

    .catch(error => {
        res.status(500)
        res.json({errrorMessage: error})
    })
}
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    if(req.params.id == undefined) {
        res.status(404)
        res.json({errorMessage: 'user id not found'})
    }
    else {
        console.log(id);
        users
        .get(id)
        .then(post => {
            res.json({post})
        })
        .catch(error => {
            res.status(500)
            res.json({errorMessage: error})
        })
    }
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(name == undefined) {
        user.status(404)
        user.json({errorMessage: 'user name not found'})
    }
    else {
        users
        .insert({ name })
        .then(user => {
            res.json({ user})
        })
        .catch(error => {
            res.status(500)
            res.json({errorMessage: 'user not found'})
        })
    }
})

server.put('/api/users/:id', (req, res) => {
    const { text, userId} = req.body;
    const { id } = req.params;
        posts
        .update(req.params.id, req.body)
        .then(post => {
            if(!post) {
                res.status(404);
                res.json({errorMessage: 'user id not found'})
            }
            else {
                res.json({ post })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({ errorMessage: 'user could not be changed'})
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
    .remove(id)
    .then(user => {
        if(!user) {
            res.status(400);
            res.json({errorMessage: 'user id not found'})
        }
        else {
            res.json({user})
        }
    })
    .catch(error => {
        res.status(500)
        res/kspm({errorMessage: 'user could not be deleted'})
    })
})

/* server.get('/api/posts', (req, res) => {

})

server.get('/api/posts/:id', (req, res) => {

})

server.post('/api/posts', (req, res) => {

})

server.put('/api/posts/:id', (req, res) => {

})

server.delete('/api/posts/:id', (req, res) => {

})
/*
server.get('/api/tags', (req, res) => {

})

server.get('/api/tags/:id', (req, res) => {

})

server.post('/api/tags', (req, res) => {

})

server.put('/api/tags/:id', (req, res) => {

})

server.delete('/api/tags/:id', (req, res) => {

})
 */
server.listen(port, () => console.log (`Server running on port ${port}`));