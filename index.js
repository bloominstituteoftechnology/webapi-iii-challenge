const express = require('express');
const logger = require('morgan');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();
const port = 9000;

const nameToUpperCase = (req, res, next) => {
    let name;
    if (req.body.name) name = req.body.name.toUpperCase();
    if (!req.body.name) name = 'NO NAME';
    req.name = name;
    next();
}

server.use(logger('combined'), express.json());

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(user => {
            res.send(user);
        })
        .catch(err => res.status(500).send({error: `The users information coud not be retrieved. | ${err}`}));
});

server.post('/api/users/', nameToUpperCase, (req, res) => {
    const name  = req.name;
    console.log(name);
    if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

    const newUser = { name };
    userDb.insert(newUser)
        .then(userId => {
            const { id } = userId;
            userDb.get(id)
                .then(user => {
                    if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});

                    res.status(201).send(user);
                });
        })
        .catch(err => res.status(500).send({error: `There was an error while saving the user to the database. | ${err}`}));
});

server.put('/api/users/:id', nameToUpperCase, (req, res) => {
    const { id } = req.params;
    const  name  = req.name;
    console.log(name);
    if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

    const newUser = { name };
    userDb.update(id, newUser)
        .then(user => {
            if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});
            res.status(200).send(user);
        })
        .catch(err => res.status(500).send({error: `The user could not be modified. | ${err}`}));
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    userDb.remove(id)
        .then(rmvdUser => {
            if(!rmvdUser) return res.status(404).send({error: `The user with the ID of ${id} does not exist.`});
            res.status(200).send({message: 'The user deleted successfully'});
        })
        .catch(err => res.status(500).send({error: `The user could not be removed. | ${err}`}))
})

server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));