const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');

const server = express();

server.use(cors());
server.use(express.json());

const port = 9000;

//Middlewares
server.use(morgan('combined'));

//Routes
server.get('/', (req, res)=> {
    res.send('Welcome to Node Blog :)')
});

server.get('/api/users/:id', (req, res)=> {
    userDb.get(req.query)
        .then(users=> {
            console.log(users);
            res.status(200).json(users);
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved."});
        })
});

server.post('/api/users', (req, res)=> {
    const {name} = req.body;
    const newUser = {name};
    userDb.insert(newUser)
        .then(userId=> {
            const {id} = userId;
            userDb.get(id)
                .then(user=> {
                    if (!req.body.name) {
                        res.status(404).json({error: "User not found"});
                    }
                    res.status(201).json(user);
                })
        })
        .catch(err=> {
            res.status(500).json({error: "This user could not be added to the database"});
        })
});

server.delete('/api/users/:id', (req, res)=> {
    const {id} = req.params;
    userDb.remove(id)
        .then(users=> {
            if (!users) {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
            res.status(200).json(users);
        })
        .catch(err=> {
            res.status(500).json({error: "The user could not be removed"});
        })
});

server.put('/api/users/:id', (req, res)=> {
    const {id} = req.params;
    const {name} = req.body;
    const updatedUser = {name};
    userDb.update(id, updatedUser)
        .then(user=> {
            if (!user) {
                res.status(404).json({error: "This user does not exist"});
            } else if (!req.body) {
                res.status(400).json({error: "Please add a name for this user"});
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be saved to the database"});
        })
});

//Listener
server.listen(port, ()=> console.log(`API running on port ${port}`));