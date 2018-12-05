const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

const PORT = 4000;
const userDB = require('./data/helpers/userDb')

server.use(
    express.json(),
    helmet(),
    logger('dev'),
)

//endpoints
server.get('/users', (req, res) => {
    userDB.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({message: 'Error getting users'})
    })
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDB.get(id)
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            res.status(404).json({message: 'That user ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding that Users Posts'})
    })
});

server.post('/users', (req, res) => {
    const user = req.body;
    
    if(user) {
        userDB.insert(user)
        .then(idInfo => {
            console.log(idInfo)
            userDB.get(idInfo)
            .then(user => {
                res.status(201).json(user)
            })
        })
        .catch(err => {
            res.status(500).json({message: 'Error creating new User'})
        })
    }
});

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    userDB.remove(id)
    .then(count => {
        if (count) {
            res.json({message: 'User Deleted'})
        } else {
            res.status(404).json({message: 'User does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error deleting user'})
    })
});

server.put('/users/:id', (req, res) => {
    const user = req.body;
    const {id} = req.params;

    if(user) {
        userDB.update(id, user)
        .then(count => {
            if(count) {
                userDB.get(id)
                .then(user => {
                    res.json(user)
                })
            } else {
                res.status(404).json({message: 'That user ID does not exist'})
            }
         })
        .catch(err => {
            res.status(500).json({message: 'error updating user'})
        })
    } else {
        res.status(400).json({message: 'Please provide a name'})
    }
})


//listener

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})