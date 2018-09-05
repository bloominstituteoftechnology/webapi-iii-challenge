//  npm init -y

// yarn add nodemon --dev

// yarn start

// 200-299: success. 300-399: redirection. 400-499: client error. 500-599: server error

const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const server = express();
const db = require('./data/dbConfig')

// add middleware
const logger = (req, res, next) => {
    console.log(`$${req.method} to ${req.url}`)
    next(); //calls the next middleware in the queue
}

server.use(logger)

// configure routing
server.get('/', (req, res) => {
    console.log(req.name)
    res.send('Api running');
});

server.post('/users', (req, res) => {
    db.insert(req.body)
    .then(response => res.status(201).json({message: 'user creation success'}))
    .catch(err => res.status(500).json({message: 'error creating user'}))
})

server.delete('/users/:id', (req, res) => {
    const {id} = req.params

    db.remove(id)
    .then(count => res.status(204).end())
    .catch(err => res.status(500).json({message: 'delete unsuccessful'}))
})

server.put('/users/:id', (req, res) => {
    const {id} = req.params
    db.update(id, req.body)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'user update fail'}))
})


// start the server
server.listen(4000, () => console.log('API On Port 4000'));