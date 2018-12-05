/***** Global Imports *****/
const express = require('express');

/***** Local Imports *****/
const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

/* Global variables */
const server = express();
const PORT = 4000;

server.use(express.json());


// Custom middleware
server.use((req, res, next) => {
    if(req.body.name !== undefined) {
        req.body.name = req.body.name.toUpperCase();
        next();
    }
    else {
        next();
    }
})

/* User CRUD Functions */
server.get('/users', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(() => {
        res.status(500).json({errorMessage: 'Server error getting users'});
    })
})

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDB.get(id)
    .then((user) => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({errorMessage: 'User does not exist'});
        }
    })
    .then(() => {
        res.status(500).json({errorMessage: 'Server error getting user by id'});
    })
})

server.post('/users', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDB.insert(user)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(() => {
            res.status(500).json({errorMessage: 'Server error adding user'});
        })
    }
})

server.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const userToUpdate = req.body;
    
    if(userToUpdate.name) {
        userDB.get(id)
        .then((user) => {
            if (user) {
                userDB.update(id, userToUpdate)
                .then(data => {
                    res.json(data);
                })
                .catch(() => {
                    res.status(500).json({errorMessage: 'Server error updating user'});
                })
            }
            else {
                res.status(404).json({errorMessage: 'User does not exist'});
            }
        })
        .catch(() => {
            res.status(500).json({errorMessage: 'Server error getting user by id'});
        })
    }
})

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    userDB.get(id)
    .then((user) => {
        if (user) {
            userDB.remove(id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(500).json({errorMessage: 'Server error deleting user.'});
            })
        }
        else {
            res.status(404).json({errorMessage: 'User does not exist.'});
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: 'Server error getting user by id'});
    })
})

/* Post CRUD Functions */
server.get('/posts', (req, res) => {
    
})

server.get('/posts/:id', (req, res) => {
    
})

server.listen(PORT, () => {
    console.log('Server is listening on port:', PORT);
})