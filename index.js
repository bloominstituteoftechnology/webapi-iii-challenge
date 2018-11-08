const express = require('express');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');
// const cors = require('cors');


const toUpperCase = require('./config/middleware/toUpperCase');
const postRouter = require('./data/posts/postRouter');
const configureMiddleware = require('./config/middleware/middleware');

const server = express();
server.use(express.json());
// server.use(helmet());
// server.use(morgan('short'));


// configureMiddleware(server);

server.get('/', (req, res) => {
    res.json('alive');
})

server.get('/users', (req, res) => {
        userDb.get()
        .then(users => res.status(200).json(users))
    .catch(err => {
        res.status(500).json({ message: "Couldn't retrieve users" })
    })
})

// server.user('/posts', postRouter)

server.get('/posts', (req, res) => {
    postDb.get()
    .then(posts => res.status(200).json(posts))
.catch(err => {
    res.status(500).json({ message: "Couldn't retrieve posts" })
})
})


server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => {
        res.status(404).json({ message: 'there is no user by that ID'})
    })
})

server.get('/users/:id/all', (req, res) => {
    userDb.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
        res.status(500).json({ message: "failed to get user posts" })
    })
})

server.get('/posts/:id', (req, res) => {
    postDb.get(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => {
        res.status(404).json({ message: 'there is no post by that ID'})
    })
})

server.post('/users', toUpperCase, (req, res) => {
    userDb.insert(req.body)
    .then(done => res.status(201).json(done))
    .catch(err => {
        res.status(400).json({ message: 'did not add new user'})
    })
})

server.post('/posts', (req, res) => {
    postDb.insert(req.body)
    .then(done => res.status(201).json(done))
    .catch(err => {
        res.status(400).json({ message: 'did not add new post'})
    })
})

server.put('/users/:id', toUpperCase, (req, res) => {
    userDb.update(req.params.id, req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
        res.status(400).json({ message: "failed to update the user" })
    })
})

server.put('/posts/:id', (req, res) => {
    postDb.update(req.params.id, req.body)
    .then(post => res.status(201).json(post))
    .catch(err => {
        res.status(400).json({ message: "failed to update the post" })
    })
})

server.delete('/users/:id', (req, res) => {
    userDb.remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => {
        res.status(400).json({ message: "could not delete user"})
    })
})

server.delete('/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => {
        res.status(400).json({ message: "could not delete post"})
    })
})




const port = 9000;
server.listen(port, () => console.log('API running'));
