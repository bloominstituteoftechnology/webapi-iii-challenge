const express = require('express');
const cors = require('cors');
// const helmet require('helmet');
const server = express();

const userDb = require('./data/helpers/userDb');

server.use(express.json());
server.use(cors());

server.use(express.json());
server.use(cors());
// server.use(helmet());

server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then((response) => res.status(200).send(response))
.catch(() => res.status(500).send({ error: 'Error fetching users' }))
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .get(id)
    .then((response) => response.length === 0
    ? res.status(200).send({error: `User not found`})
    : res.status(200).send(response))
.catch(() => res.status(500).send({ error: 'Error fetching users' }))
});

server.post('/api/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
        res.status(400).send({error: 'Please provide a name for the user'});
    }

    userDb.insert(req.body).then(user => {
        res.status(200).send(req.body)
    }).catch(err => {
        res.status(500).send({error: 'There was a error while saving to user to database'});
    })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
        .then(response  => {
            if (response.length === 0) {
                res.status(404).send({message: 'No user with found'})
            }
            else {
                userDb.get(id)
                    .then(response => {
                        res.status(201).send(response);
                    })
            }
        }).catch(err => {
            res.status(500).send({error: 'problem'});
    })
});

server.put('/api/users/:id', (req, res) => {

    let id = req.params.id;
    let name = req.body;
    if (name && (name.name)) {
        userDb.update(id, name)
            .then(response => {
                if (response == 0) {
                    res.status(404).send({ message: "The post with the specified ID does not exist" })
                } else {
                    userDb.get(id)
                        .then(response => {
                            res.status(200).send(response)
                        })
                        .catch(error => res.status(500).send( { error: "There was an error updating the post" }))
                }
            })
    } else {
        res.status(400).send({ error: "Please provide title or content for the post" })
    }
});

server.listen(3500, console.log('Listening'));