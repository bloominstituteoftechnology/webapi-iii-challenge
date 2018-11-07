const express = require('express');
const morgan = require('morgan');

const userDb = require('./data/helpers/userDb');

const server = express();
server.use(morgan('dev'));

server.get('/', (req,res) => res.send({API: "live", "Users": "live", "Posts": "not live"}));

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

server.post('/api/users/', async (req, res) => {
    try {
        const user = await userDb.insert(req.body);
        db.get(user.id).then(user => res.status(201).json(user)).catch(err => res.status(404).json({message: "The user with the specified ID does not exist."}));
    }
    catch (err) {
        res.status(500).json({error: "There was an error while saving the user to the database", err})
    }
})

server.delete('/api/users/:id', (req,res) => {
    userDb.remove(req.params.id).then(count => {
        if (count) {
            res.status(200).json(count);
        }
        else {
            res.status(404).json({message: "The user with the specified ID does not exist."});
        }
    }).catch(err => {
        res.status(500).json({error: "The user could not be removed"});
    })
})



server.listen(9000, () => console.log('Server running on port 9000'));