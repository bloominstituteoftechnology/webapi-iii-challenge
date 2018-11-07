const express = require('express');
const morgan = require('morgan');

const userDb = require('./data/helpers/userDb');

const server = express();
server.use(morgan('dev'));

server.get('/', (req,res) => {
    res.send({API: "live"});
})

server.get('/api/users', (req, res) => {
    userDb.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({error: "The users information could not be retrieved."})
    })
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    userDb.get(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } 
            res.status(404).json({message: "The user with the specified ID does not exist."});
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."});
        })
});

server.post('/api/users/', (req, res) => {
    userDb.insert(req.body).then(user => {
        res.status(201).json(post);
    }).catch(err => {
        res.status(500).json({error: "There was an error while saving the user to the database"});
    })
});


server.listen(9000, () => console.log('Server running on port 9000'));