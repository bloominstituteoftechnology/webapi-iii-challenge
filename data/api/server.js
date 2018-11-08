const express = require("express");
const server = express();
const upperCaseUser = require('../middleware/upperCaseUsers');

const postDb = require('../helpers/postDb');
const userDb = require('../helpers/userDb');

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({error: 'users cannot be retrieved', error: error});
        });
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({error: 'user cannot be retrieved', error: error});
        })
})

server.post('/api/users', upperCaseUser, (req, res) => {
    if(req.body.name){
        userDb.insert(req.body)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({error: 'user cannot be added', error: error})
            })
    }else{
        res.status(400).json({errorMessage: 'Please provide a name'})
    }
})

server.put('/api/users/:id', upperCaseUser, (req, res) => {
    const id = req.params.id;
    if(req.body.name){
        userDb.update(id, req.body)
            .then(count => {
                if(count === 1){
                    res.status(200).json({message: 'The user has been updated'})
                }else{
                    res.status(404).json({message: 'The user does not exist'})
                }
            })
            .catch(error => {
                res.status(500).json({ error: "The user information could not be modified.", 'error': error });
            })
    }else{
        res.status(400).json({ message: "Please provide name" })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
        .then(count => {
            if(count === 1){
                res.status(200).json({message: 'the user has been deleted'});
            }else{
                res.status(404).json({message: 'the user does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({error: 'the user cannot be deleted', error: error})
        })
})

module.exports = server;
