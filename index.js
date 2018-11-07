//  npm init -y

// yarn add nodemon --dev

// yarn start

// 200-299: success. 300-399: redirection. 400-499: client error. 500-599: server error

const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan')
const cors = require('cors')
const server = express();
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

// add middleware
const logger = (req, res, next) => {
    console.log(`$${req.method} to ${req.url}`)
    next(); //calls the next middleware in the queue
}

// const upperCase = (req, res, next) => {
//     console.log(req.body)
//     req.body.name.toUpperCase();
//     next()

    // if (req.body.length < 1 || req.body.lengh > 128) {
    //     res.status(401).json({ message: 'name is required and cannot exceed 128 characters' })
    // } else {
    //     req.body.toUpperCase();
    //     next();
    // }
// }

// const textCheck = (req, res, next) => {
//     if (req.body.length < 1) {
//         res.status(401).json({ message: 'text is required' })
//     } else {
//         next();
//     }
// }
server.use(helmet())
// server.use(morgan('short'))
server.use(logger)
// server.use(upperCase)
// server.use(textCheck)
server.use(express.json()); 


// configure routing
server.get('/', (req, res) => {
    console.log(req.name)
    res.send('Api running');
});

// USERS

server.get('/users', (req, res) => {

    userDb.get().then(users => {
        res.status(200).json(users)
    })
        .catch(err => res.status(404).json({ message: "couldnt access users" }))
})

server.get('/users/:id', (req, res) => {
    const id = req.params;

    userDb.get(id).then(user => {
        res.status(200).json(user.id)
    })
        .catch(err => res.status(404).json({ message: "The user with the specified ID does not exist." }))
})

server.post('/users', (req, res) => {
    userDb.insert(req.body)
        .then(response => res.status(201).json({ message: 'user creation success' }))
        .catch(err => res.status(500).json({ message: 'error creating user' }))
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params

    userDb.remove(id)
        .then(count => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'delete unsuccessful' }))
})

server.put('/users/:id', (req, res) => {
    const { id } = req.params
    userDb.update(id, req.body)
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: 'user update fail' }))
})

// POSTS

server.get('/posts', (req, res) => {

    postDb.get().then(posts => {
        res.status(200).json(posts)
    })
        .catch(err => res.status(404).json({ message: "couldnt access posts" }))
})

server.get('/posts/:id', (req, res) => {
    const id = req.params;

    postDb.get(id).then(posts => {
        res.status(200).json(posts.id)
    })
        .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))
})

server.post('/posts', (req, res) => {
    postDb.insert(req.body)
        .then(response => res.status(201).json({ message: 'post creation success' }))
        .catch(err => res.status(500).json({ message: 'error creating posts' }))
})

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params

    postDb.remove(id)
        .then(count => res.status(204).json({message: 'delete successful'}).end())
        .catch(err => res.status(500).json({ message: 'delete unsuccessful' }))
})

server.put('/posts/:id', (req, res) => {
    const { id } = req.params
    postDb.update(id, req.body)
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ message: 'post update fail' }))
})


// start the server
server.listen(4000, () => console.log('API On Port 4000'));

