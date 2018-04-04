const express = require('express');

const db = require('./data/helpers/userDb.js');

const server = express();

server.use(express.json());

//TEST BELOW

// server.get('/', (req,res) => {
//     res.json({q:1});
// });

//GET REQUEST
server.get('/api/users', (req,res) => {

    db
        .get()
        .then(users => {
            res 
                .status(200)
                .json(users)
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The users could not be retrieved' })
        });
});

server.get('/api/users/:id', (req,res) => {
    const { id } = req.params;

    db
        .get(id)
        .then(users => {
            res 
                .status(200)
                .json(users)
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The users could not be retrieved' })
        });
});

//GET DELETE

server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params;

    db 
        .remove(id)
            .then(user => {
                if (user > 0) {
                    res 
                        .status(200)
                        .json({ message: 'User deleted successfully!'})
                } else {
                    res
                        .status(404)
                        .json({error: 'User not found'})
                }})
            .catch(error => {
                res 
                    .status(500)
                    .json({ error: 'The users could not be retrieved' })
            });
});

//GET POST

server.post('/api/users', (req,res) => {
    let user = req.body;

    if (!user.name) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name!' })
            return;
    } 
    if (user.name.length > 128) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name thats shorter than 128 characters!' })
            return;
    }
    
    db  
        .insert(user)
        .then(id => {
            res
                .status(201)
                .json(user)
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The new users could not be retrieved' });
        });

    // res.json({q:2});
});

//GET PUT

server.put('/api/users/:id', (req,res) => {
    const { id } = req.params;
    const updatedUser = req.body

    if (!updatedUser.name) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name!' });
            return;
    } 
    if (updatedUser.name.length > 128) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name thats shorter than 128 characters!' });
            return;
    }

    db  
        .update(id, updatedUser)
        .then(updates => {
            res 
                .status(200)
                .json({ message: `User name was updated to ${updatedUser.name}`});
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The new users could not be retrieved' })
        });
});

// res.json({q:2});

const port = 5000;

server.listen(port, () => {console.log("Server running on port 5000")});