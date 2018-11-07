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

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
    .get(id)
    .then(user => {
        if(user === 0) {
            return errorMessage(404, 'No user by that id', res)
        }
        res.json(user)
    })
    .catch(err => {
        return errorMessage(500, 'Not found', res)
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
    .remove(id)
    .then(removedUser => {
        if (removedUser === 0) {
            return errorMessage(404, 'No user by that id')
        } else {
            res.json({success: 'Removed User Successfully'})
        }
    })
    .catch(err => {
        return errorMessage(500, 'Not Found', res)
    })
})

server.put('/api/users/:id', nameCheckMiddleware, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
    .update(id, { name })
    .then(response => {
        if (response === 0) {
            return errorMessage(404, 'No user by that id')
        } else {
            db.find(id).then(user => {
                res.json(user)
            })
        }
    })
    .catch(err => {
        return errorMessage(500, 'Not Found', res)
    }) 
})













server.listen(port, () => {console.log(`\n==^_^==Server listening on port ${port}==^_^==`)})