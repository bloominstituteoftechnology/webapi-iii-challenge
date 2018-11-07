const express = require('express');
const cors = require('cors')
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');
const port = 7412;
const server = express();
server.use(express.json())
server.use(cors({}))

const errorMessage = (status, message, res) => {
    res.status(status).json({error: message})
}

const nameCheckMiddleware = (req, res, next) => {
    const { name } = req.body;
    if(!name) {
        errorMessage(404, 'Name must be included', res)
        next()
    } else {
        next()
    }
}

server.get('/api/users', (req, res) => {
    users
    .get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        return errorMessage(500, 'Not found', res)
    })
})

server.post('/api/users', nameCheckMiddleware, (req, res) => {
    const { name } = req.body;
    users
    .insert({ name })
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        return errorMessage(500, 'Not found', res)
    })
})















server.listen(port, () => {console.log(`\n==^_^==Server listening on port ${port}==^_^==`)})