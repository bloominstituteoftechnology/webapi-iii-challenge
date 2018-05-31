const express = require('express');
const cors = require('cors');

const port = 5001;
const server = express();
server.use(express.json())
server.use(cors({ origin: 'http://localhost:3000' }));

const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');
const users = require('./data/helpers/userDb.js');

/***********************
**** User endpoints ****
************************/
server.get('/api/users', (req, res) => {
    users.get()
        .then( users => {
            res.status(200).json({ users })
        })
        .catch( error => {
            res.status(500).json({ error: "Could not get users" })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.get(id)
        .then( user => {
            user ? res.status(200).json(user) : res.status(404).json({ userError: `There is no user with id ${id}`})
        })
        .catch( error => {
            res.status(500).json({ error: `Could not get user with id ${id}`})
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body
    name ? (
        users.insert({ name })
            .then( id => {
                res.status(201)
                users.get(id.id)
                    .then( user => {
                        user ? res.status(200).json(user) : res.status(404).json({ userError: `There is no user with id ${id}`})
                    })
                    .catch( error => {
                        res.status(500).json({ error: `Could not get user with id ${id}`})
                    })
            })
            .catch( error => {
                res.status(500).json({ error: `Could not get create new user with name '${name}'`})
            })
    ) : (
        res.status(400).json({ userError: "Please provide a name for the user" })
    )
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.remove(id)
        .then( response => {
            if (response) {
                res.status(200)
                users.get()
                    .then( users => {
                        res.status(200).json({ users })
                    })
                    .catch( error => {
                        res.status(500).json({ error: "Could not get users" })
                    })
            } else {
                res.status(404).json({ userError: `There is no user with id ${id}`})
            }
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    name ? (
        users.update(id, { name })
            .then( response => {
                if (response) {
                    res.status(200)
                    users.get(id)
                        .then( user => {
                            user ? res.status(200).json(user) : res.status(404).json({ userError: `There is no user with id ${id}`})
                        })
                        .catch( error => {
                            res.status(500).json({ error: `Could not get user with id ${id}`})
                        })
                } else {
                    res.status(500).json({ error: `Could not update user with id ${id}`})
                }
            })
    ) : (
        res.status(404).json({ userError: "Please provide a name for the user"})
    )
})

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params
    users.getUserPosts(id)
        .then( posts => {
            posts.length > 0 ? res.status(200).json(posts) : res.status(404).json({ userError: `User with id ${id} has no posts`})
        })
        .catch( error => {
            res.status(500).json({ error: `Could not get posts for user with id ${id}`})
        })
})

//server.get('/api/posts')
//server.get('/api/tags')

server.listen(port, () => console.log(`listening on port ${port}`));
