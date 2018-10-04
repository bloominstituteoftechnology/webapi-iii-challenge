const express = require('express');
const logger = require('morgan');
const moment = require('moment');

const userDb = require('./data/helpers/userDb.js');
const postRoutes = require('./posts/postRoutes.js');

const server = express();
const port = 9000;

const nameToUpperCase = (req, res, next) => {
    let name;
    if (req.body.name) name = req.body.name.toUpperCase();
    if (!req.body.name) name = 'NO NAME';
    if (name.length > 128) name = name.slice(0, 128);
    req.name = name;
    console.log('\x1b[35m', `\n[nameToUpperCase] [${moment().format()}] \"${req.method} ${req.originalUrl} ${req.protocol}} \" - \"Set user\'s name ${req.body.name} to ${name}\"`);
    console.log('\x1b[0m', '');
    next();
}

server.use(logger('combined'), express.json());

server.use('/api/posts', postRoutes);

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(user => {
            res.send(user);
        })
        .catch(err => res.status(500).send({error: `The users information coud not be retrieved. | ${err}`}));
});

server.post('/api/users/', nameToUpperCase, (req, res) => {
    const name  = req.name;
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
    if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

    const newUser = { name };
    userDb.update(id, newUser)
        .then(user => {
            if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});
            res.status(200).json(user);
        })
        .catch(err => res.status(500).send({error: `The user could not be modified. | ${err}`}));
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(rmvdUser => {
            if(!rmvdUser) return res.status(404).send({error: `The user with the ID of ${id} does not exist.`});
            res.status(200).json(rmvdUser);
        })
        .catch(err => res.status(500).send({error: `The user could not be removed. | ${err}`}))
})

function runServer() {
    console.log('\x1b[34m', `\n[server] started server`);
    console.log(`[server] running on port: ${port}\n`)
    console.log('\x1b[0m', '');
}

server.listen(port, runServer());
